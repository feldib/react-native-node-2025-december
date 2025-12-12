import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Event } from "../entities/Event";
import { UsersOfEvent } from "../entities/UsersOfEvent";

const eventRepository = AppDataSource.getRepository(Event);
const usersOfEventRepository = AppDataSource.getRepository(UsersOfEvent);

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, startDate, finishDate, category } = req.body;

    const event = eventRepository.create({
      name,
      startDate: new Date(startDate),
      finishDate: finishDate ? new Date(finishDate) : null,
      category,
    });

    const savedEvent = await eventRepository.save(event);
    res.status(201).json(savedEvent);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventRepository.find({
      where: { isDeleted: false },
      order: { startDate: "DESC" },
    });

    // Get all users for all events
    const eventsWithUsers = await Promise.all(
      events.map(async (event) => {
        const relations = await usersOfEventRepository.find({
          where: { eventId: event.id },
          relations: ["user"],
        });

        // Filter out deleted users and return only user data
        const users = relations
          .filter((r) => !r.user.isDeleted)
          .map((r) => r.user);

        return { ...event, users };
      })
    );

    res.json(eventsWithUsers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id);

    const event = await eventRepository.findOne({
      where: {
        id: eventId,
        isDeleted: false,
      },
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Get users for this event, that are either approved or creators
    const relations = await usersOfEventRepository.find({
      where: [
        { eventId, leftEvent: false, isApproved: true },
        { eventId, leftEvent: false, isCreator: true },
      ],
      relations: ["user"],
    });

    // Filter out deleted users and return only user data
    const users = relations.filter((r) => !r.user.isDeleted).map((r) => r.user);

    res.json({ ...event, users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get current user's status in relation to an event
export const getUserEventStatus = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id);
    const userId = parseInt(req.params.userId);

    const event = await eventRepository.findOne({
      where: { id: eventId, isDeleted: false },
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const relation = await usersOfEventRepository.findOne({
      where: { eventId, userId },
    });

    if (!relation) {
      return res.json({
        hasRequestedToJoin: false,
        isCreator: false,
        isApproved: false,
        leftEvent: false,
      });
    }

    res.json({
      hasRequestedToJoin: true,
      isCreator: relation.isCreator,
      isApproved: relation.isApproved,
      leftEvent: relation.leftEvent,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { name, startDate, finishDate, category } = req.body;
    const eventId = parseInt(req.params.id);

    const event = await eventRepository.findOne({
      where: { id: eventId, isDeleted: false },
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (name !== undefined) event.name = name;
    if (startDate !== undefined) event.startDate = new Date(startDate);
    if (finishDate !== undefined)
      event.finishDate = finishDate ? new Date(finishDate) : null;
    if (category !== undefined) event.category = category;

    const savedEvent = await eventRepository.save(event);
    res.json(savedEvent);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id);

    const event = await eventRepository.findOne({ where: { id: eventId } });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    event.isDeleted = true;
    await eventRepository.save(event);

    res.json({ message: "Event deleted successfully", id: eventId });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Leave event (only non-creators can leave)
export const leaveEvent = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id);
    const userId = parseInt(req.params.userId);

    const relation = await usersOfEventRepository.findOne({
      where: { eventId, userId },
    });

    if (!relation) {
      return res.status(404).json({ error: "User not found in event" });
    }

    if (relation.isCreator) {
      return res.status(403).json({ error: "Creator cannot leave the event" });
    }

    relation.leftEvent = true;
    const savedRelation = await usersOfEventRepository.save(relation);
    res.json(savedRelation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remove user from event
export const removeEventUser = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.id);
    const userId = parseInt(req.params.userId);

    const result = await usersOfEventRepository.delete({ eventId, userId });

    if (result.affected === 0) {
      return res.status(404).json({ error: "User not found in event" });
    }

    res.json({ message: "User removed from event successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
