import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { User } from "./User";
import { Event } from "./Event";

@Entity("users_of_event")
@Unique(["userId", "eventId"])
export class UsersOfEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ name: "event_id" })
  eventId: number;

  @Column({ name: "is_creator", default: false })
  isCreator: boolean;

  @Column({ name: "is_approved", default: false })
  isApproved: boolean;

  @Column({ name: "left_event", default: false })
  leftEvent: boolean;

  @ManyToOne(() => User, (user) => user.usersOfEvents, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Event, (event) => event.usersOfEvents, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "event_id" })
  event: Event;
}
