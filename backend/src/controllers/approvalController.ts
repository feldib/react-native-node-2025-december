import { Request, Response } from "express";
import ApprovalEnum from "../enums/approval";
import { AppDataSource } from "../config/database";
import { UsersOfEvent } from "../entities/UsersOfEvent";
import { Approval } from "../entities/Approval";
import { Event } from "../entities/Event";
import { Not } from "typeorm";

const eventRepository = AppDataSource.getRepository(Event);
const usersOfEventRepository = AppDataSource.getRepository(UsersOfEvent);
const approvalRepository = AppDataSource.getRepository(Approval);

// Request to join an event
export const requestJoinEvent = async (req: Request, res: Response) => {
  try {
    const { userId, eventId, isCreator } = req.body as {
      userId: number;
      eventId: number;
      isCreator?: boolean;
    };

    await ensureEventExists(eventId);

    // Check if user already has a relation
    const existingRelation = await usersOfEventRepository.findOne({
      where: { eventId, userId },
    });

    if (existingRelation) {
      return res.status(400).json({ error: "User already joined this event" });
    }

    // Create UsersOfEvent record with isApproved=false (unless creator)
    const relation = usersOfEventRepository.create({
      userId,
      eventId,
      isCreator: isCreator || false,
      isApproved: isCreator || false, // Creators are auto-approved
    });

    await usersOfEventRepository.save(relation);

    // If not creator, create approval records for all qualified voters
    if (!isCreator) {
      const voters = await getQualifiedVoters(eventId);

      const approvalRecords = voters.map((voter) =>
        approvalRepository.create({
          approverUserId: voter.userId,
          targetUserId: userId,
          eventId,
          status: ApprovalEnum.PENDING,
        })
      );

      await approvalRepository.save(approvalRecords);

      return res.status(201).json({
        message: "Join request submitted, awaiting approval",
        relation,
        approvalsNeeded: voters.length,
      });
    }

    res.status(201).json({
      message: "Event creator added successfully",
      relation,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getJoinRequests = async (req: Request, res: Response) => {
  try {
    const { eventId, currentUserId } = req.body as {
      eventId: number;
      currentUserId: number;
    };
    await ensureEventExists(eventId);

    // Get all pending target users (unique users requesting to join)
    const pendingTargets = await usersOfEventRepository.find({
      where: {
        eventId,
        isApproved: false,
        leftEvent: false,
      },
      relations: ["user"],
    });

    // Filter out deleted users
    const activePendingTargets = pendingTargets.filter(
      (t) => !t.user.isDeleted
    );

    // Get qualified voters (creators or approved members who haven't left)
    const voters = await getQualifiedVoters(eventId);
    const totalNecessaryApprovals = voters.length;

    // Build result for each pending target user
    const result = await Promise.all(
      activePendingTargets.map(async (targetRelation) => {
        const targetUserId = targetRelation.userId;

        // Get all approvals for this target user
        const approvals = await approvalRepository.find({
          where: { eventId, targetUserId },
        });

        // Count current approvals
        const currentApprovals = approvals.filter(
          (a) => a.status === ApprovalEnum.APPROVED
        ).length;

        // Find current user's approval for this target
        const currentUserApproval = approvals.find(
          (a) => a.approverUserId === currentUserId
        );

        return {
          targetUser: targetRelation.user,
          totalNecessaryApprovals,
          currentApprovals,
          currentUserApprovalId: currentUserApproval?.id || null,
          currentUserApprovalStatus: currentUserApproval?.status || null,
        };
      })
    );

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Approve or reject a user's join request for an event
export const setJoinRequest = async (req: Request, res: Response) => {
  try {
    const { eventId, approverUserId, targetUserId, status } = req.body as {
      eventId: number;
      approverUserId: number;
      targetUserId: number;
      status: ApprovalEnum;
    };

    // Validate inputs and state
    validateApprovalStatus(status);
    await ensureEventExists(eventId);
    await ensureApproverEligible(eventId, approverUserId);
    const targetRelation = await ensureTargetPending(eventId, targetUserId);

    // Upsert approval
    await upsertApproval({ eventId, approverUserId, targetUserId, status });

    // Aggregate and possibly apply approval result
    const aggregateResult = await aggregateApprovalsAndMaybeApprove(
      eventId,
      targetRelation,
      targetUserId
    );

    return res.json({ message: aggregateResult.message, status });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Helpers
function validateApprovalStatus(status: ApprovalEnum) {
  if (!Object.values(ApprovalEnum).includes(status)) {
    throw new Error("Invalid approval status");
  }
}

async function ensureEventExists(eventId: number) {
  const event = await eventRepository.findOne({
    where: { id: eventId, isDeleted: false },
  });
  if (!event) {
    throw new Error("Event not found");
  }
}

async function ensureApproverEligible(eventId: number, approverUserId: number) {
  const approverRelation = await usersOfEventRepository.findOne({
    where: { eventId, userId: approverUserId },
  });
  if (!approverRelation || approverRelation.leftEvent) {
    throw new Error("Approver not part of event");
  }
  if (!(approverRelation.isCreator || approverRelation.isApproved)) {
    throw new Error("Approver must be creator or approved member");
  }
}

async function ensureTargetPending(eventId: number, targetUserId: number) {
  const targetRelation = await usersOfEventRepository.findOne({
    where: { eventId, userId: targetUserId },
  });
  if (!targetRelation || targetRelation.leftEvent) {
    throw new Error("Target user not found in event or has left");
  }
  if (targetRelation.isApproved) {
    throw new Error("Target user was already approved");
  }
  return targetRelation;
}

async function upsertApproval(args: {
  eventId: number;
  approverUserId: number;
  targetUserId: number;
  status: ApprovalEnum;
}) {
  const { eventId, approverUserId, targetUserId, status } = args;
  let approval = await approvalRepository.findOne({
    where: { approverUserId, targetUserId, eventId },
  });
  if (!approval) {
    approval = approvalRepository.create({
      approverUserId,
      targetUserId,
      eventId,
      status,
    });
  } else {
    approval.status = status;
  }
  await approvalRepository.save(approval);
}

async function getQualifiedVoters(eventId: number) {
  const qualifiedMembers = await usersOfEventRepository.find({
    where: { eventId },
  });
  return qualifiedMembers.filter(
    (r) => (r.isCreator || r.isApproved) && !r.leftEvent
  );
}

async function getApprovalSummary(eventId: number, targetUserId: number) {
  const approvals = await approvalRepository.find({
    where: { eventId, targetUserId },
  });
  const approvedByIds = new Set(
    approvals
      .filter((a) => a.status === ApprovalEnum.APPROVED)
      .map((a) => a.approverUserId)
  );
  const rejectedExists = approvals.some(
    (a) => a.status === ApprovalEnum.REJECTED
  );
  return { approvedByIds, rejectedExists };
}

async function maybeApproveTarget(
  targetRelation: UsersOfEvent,
  shouldApprove: boolean
) {
  if (shouldApprove && !targetRelation.isApproved) {
    targetRelation.isApproved = true;
    await usersOfEventRepository.save(targetRelation);
    return { message: "User approved by all members" };
  }

  if (!shouldApprove && targetRelation.isApproved) {
    targetRelation.isApproved = false;
    await usersOfEventRepository.save(targetRelation);
  }

  return { message: "Approval recorded" };
}

async function aggregateApprovalsAndMaybeApprove(
  eventId: number,
  targetRelation: UsersOfEvent,
  targetUserId: number
) {
  const voters = await getQualifiedVoters(eventId);

  if (voters.length === 0) {
    return { message: "Approval recorded" };
  }

  const { approvedByIds, rejectedExists } = await getApprovalSummary(
    eventId,
    targetUserId
  );
  const allApproved = voters.every((v) => approvedByIds.has(v.userId));

  if (rejectedExists) {
    return maybeApproveTarget(targetRelation, false).then((result) => ({
      message: "Approval recorded: rejected by at least one member",
    }));
  }

  return maybeApproveTarget(targetRelation, allApproved);
}
