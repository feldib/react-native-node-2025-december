import { QueryClient } from '@tanstack/react-query';
import config from '../../config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: config.reactQuery.staleTime,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
