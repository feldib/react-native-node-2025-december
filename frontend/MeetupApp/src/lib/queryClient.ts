import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import config from '../../config';
import { getAccessToken } from '@/helpers/tokens';

// Will be set by AuthProvider
let globalLogout: (() => Promise<void>) | null = null;

export const setQueryClientLogout = (logout: () => Promise<void>) => {
  globalLogout = logout;
};

// Global error handler for both queries and mutations
const handleAuthError = async (error: any) => {
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    const token = await getAccessToken();
    // Only logout if there's no token (refresh failed)
    if (!token && globalLogout) {
      console.log('Auth error detected, triggering logout...');
      await globalLogout();
    }
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleAuthError,
  }),
  mutationCache: new MutationCache({
    onError: handleAuthError,
  }),
  defaultOptions: {
    queries: {
      staleTime: config.reactQuery.staleTime,
      retry: (failureCount, error: any) => {
        // Don't retry on auth errors
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          return false;
        }
        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
