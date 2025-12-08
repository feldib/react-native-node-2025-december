import { UsersOfEvent } from './UsersOfEvent';

export type Event = {
  id: number;

  name: string;

  startDate: Date;

  finishDate: Date | null;

  categoryId: number;

  categoryName: string | null;

  users: UsersOfEvent[];
};
