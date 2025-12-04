import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UsersOfEvent } from "./UsersOfEvent";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ name: "start_date", type: "timestamp" })
  startDate: Date;

  @Column({ name: "is_finished", default: false })
  isFinished: boolean;

  @Column({ name: "is_deleted", default: false })
  isDeleted: boolean;

  @Column({ name: "category_id" })
  categoryId: number;

  @OneToMany(() => UsersOfEvent, (usersOfEvent) => usersOfEvent.event)
  usersOfEvents: UsersOfEvent[];
}
