import {
  BASE_API_URL,
  EVENTS_ENDPOINT,
  CATEGORIES_ENDPOINT,
  USERS_ENDPOINT,
} from '@env';

const fetching = {
  base: BASE_API_URL || 'http://localhost:3000/api',
  events: EVENTS_ENDPOINT || '/events',
  categories: CATEGORIES_ENDPOINT || '/categories',
  users: USERS_ENDPOINT || '/users',
};

const config = { fetching };
export default config;
