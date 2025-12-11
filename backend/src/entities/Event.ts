import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UsersOfEvent } from "./UsersOfEvent";
import CategoryEnum from "../enums/category";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ name: "start_date", type: "timestamp" })
  startDate: Date;

  @Column({ name: "finish_date", type: "timestamp", nullable: true })
  finishDate: Date | null;

  @Column({ name: "is_deleted", default: false })
  isDeleted: boolean;

  @Column({
    name: "category",
    type: "enum",
    enum: CategoryEnum,
    nullable: false,
  })
  category: string;

  @OneToMany(() => UsersOfEvent, (usersOfEvent) => usersOfEvent.event)
  usersOfEvents: UsersOfEvent[];
}
