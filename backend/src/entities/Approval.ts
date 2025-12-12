import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Event } from "./Event";
import ApprovalEnum from "../enums/approval";

/**
 * Tracks per-member approvals for a user requesting to join an event.
 * Each record represents one approver user's decision about a target user for a specific event.
 */
@Entity("approvals")
@Unique(["approverUserId", "targetUserId", "eventId"])
export class Approval {
  @PrimaryGeneratedColumn()
  id: number;

  /** The user who gives the approval (current event member). */
  @Column({ name: "approver_user_id" })
  approverUserId: number;

  /** The user who is requesting to join and is being approved/rejected. */
  @Column({ name: "target_user_id" })
  targetUserId: number;

  /** The event for which the approval is being made. */
  @Column({ name: "event_id" })
  eventId: number;

  /** Current approval status from this approver for the target user. */
  @Column({
    name: "status",
    type: "enum",
    enum: ApprovalEnum,
    default: ApprovalEnum.PENDING,
  })
  status: ApprovalEnum;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.usersOfEvents, { onDelete: "CASCADE" })
  @JoinColumn({ name: "approver_user_id" })
  approverUser: User;

  @ManyToOne(() => User, (user) => user.usersOfEvents, { onDelete: "CASCADE" })
  @JoinColumn({ name: "target_user_id" })
  targetUser: User;

  @ManyToOne(() => Event, (event) => event.usersOfEvents, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "event_id" })
  event: Event;
}
