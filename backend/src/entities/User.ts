import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { UsersOfEvent } from "./UsersOfEvent";
import GenderEnum from "../enums/gender";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name", length: 100 })
  firstName: string;

  @Column({ name: "last_name", length: 100 })
  lastName: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn({ name: "date_joined" })
  dateJoined: Date;

  @Column()
  age: number;

  @Column({
    name: "gender",
    type: "enum",
    enum: GenderEnum,
    nullable: false,
  })
  gender: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "text", array: true, nullable: true })
  photos: string[];

  @Column({ name: "is_deleted", default: false })
  isDeleted: boolean;

  @OneToMany(() => UsersOfEvent, (usersOfEvent) => usersOfEvent.user)
  usersOfEvents: UsersOfEvent[];
}
