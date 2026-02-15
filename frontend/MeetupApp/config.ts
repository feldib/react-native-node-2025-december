import { Platform } from 'react-native';
import {
  BASE_API_URL_IOS,
  BASE_API_URL_ANDROID,
  EVENTS_ENDPOINT,
  CATEGORIES_ENDPOINT,
  USERS_ENDPOINT,
  APPROVALS_ENDPOINT,
  QUERY_STALE_TIME,
} from '@env';

const fetching = {
  base: Platform.select({
    ios: BASE_API_URL_IOS || 'http://localhost:3000/api',
    android: BASE_API_URL_ANDROID || 'http://localhost:3000/api',
  }),
  events: EVENTS_ENDPOINT || '/events',
  categories: CATEGORIES_ENDPOINT || '/categories',
  users: USERS_ENDPOINT || '/users',
  approvals: APPROVALS_ENDPOINT || '/approvals',
};

const reactQuery = {
  staleTime: parseInt(QUERY_STALE_TIME || '300000'), // Default to 5 minutes
};

const config = { fetching, reactQuery };
export default config;
