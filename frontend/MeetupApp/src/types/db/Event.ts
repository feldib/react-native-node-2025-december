import { User } from './User';

export type Event = {
  id: number;

  name: string;

  startDate: Date;

  finishDate: Date | null;

  category: string;

  users: User[];
};
