import { UsersOfEvent } from './UsersOfEvent';

export type Event = {
  id: number;

  name: string;

  startDate: Date;

  finishDate: Date | null;

  category: string;

  users: UsersOfEvent[];
};
