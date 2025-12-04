import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { UsersOfEvent } from "./UsersOfEvent";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name", length: 100 })
  firstName: string;

  @Column({ name: "last_name", length: 100 })
  lastName: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn({ name: "date_joined" })
  dateJoined: Date;

  @Column()
  age: number;

  @Column({ length: 20 })
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
