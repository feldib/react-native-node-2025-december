import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { User } from '@/types/db/User';
import { Event } from '@/types/db/Event';
import config from '../../config';
import {
  getAccessToken,
  getRefreshToken,
  storeAccessToken,
  storeRefreshToken,
  clearTokens,
} from '@/helpers/tokens';

interface JoinRequest {
  targetUser: any;
  totalNecessaryApprovals: number;
  currentApprovals: number;
  currentUserApprovalId: number | null;
  currentUserApprovalStatus: string | null;
}

export interface UserEventStatus {
  hasRequestedToJoin: boolean;
  isCreator: boolean;
  isApproved: boolean;
  leftEvent: boolean;
}

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  description?: string;
}

// Base query with token handling
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: config.fetching.base,
  prepareHeaders: async (headers, { endpoint }) => {
    // Public endpoints that don't need tokens
    const publicEndpoints = ['login', 'register', 'getEvents'];

    if (!publicEndpoints.includes(endpoint)) {
      const token = await getAccessToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    }
    return headers;
  },
});

// Base query with automatic token refresh
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to refresh the token
    const refreshToken = await getRefreshToken();

    if (refreshToken) {
      try {
        const refreshResult = await baseQueryWithAuth(
          {
            url: `${config.fetching.users}/refresh-token`,
            method: 'POST',
            body: { refreshToken },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const { accessToken, refreshToken: newRefreshToken } =
            refreshResult.data as {
              accessToken: string;
              refreshToken: string;
            };

          // Store new tokens
          await storeAccessToken(accessToken);
          await storeRefreshToken(newRefreshToken);

          // Retry the original query with new token
          result = await baseQueryWithAuth(args, api, extraOptions);
        } else {
          // Refresh failed, clear tokens
          await clearTokens();
        }
      } catch {
        // Refresh failed, clear tokens
        await clearTokens();
      }
    } else {
      // No refresh token, clear tokens
      await clearTokens();
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Events', 'Event', 'Auth', 'JoinRequests', 'UserEventStatus'],
  endpoints: builder => ({
    // Auth endpoints
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: credentials => ({
          url: `${config.fetching.users}/login`,
          method: 'POST',
          body: credentials,
        }),
        transformResponse: async (response: LoginResponse) => {
          // Store tokens after successful login
          await storeAccessToken(response.accessToken);
          await storeRefreshToken(response.refreshToken);
          return response;
        },
        invalidatesTags: ['Auth'],
      },
    ),

    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: userData => ({
        url: `${config.fetching.users}/register`,
        method: 'POST',
        body: userData,
      }),
      transformResponse: async (response: LoginResponse) => {
        // Store tokens after successful registration
        await storeAccessToken(response.accessToken);
        await storeRefreshToken(response.refreshToken);
        return response;
      },
      invalidatesTags: ['Auth'],
    }),

    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          const refreshToken = await getRefreshToken();

          if (refreshToken) {
            // Call backend logout endpoint
            await fetch(
              `${config.fetching.base}${config.fetching.users}/logout`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
              },
            );
          }

          // Clear tokens from device
          await clearTokens();

          return { data: undefined };
        } catch (error) {
          console.error('Error logging out:', error);
          // Clear tokens anyway even if backend call fails
          await clearTokens();
          return { data: undefined };
        }
      },
      invalidatesTags: ['Auth'],
    }),

    // Events endpoints
    getEvents: builder.query<Event[], void>({
      query: () => config.fetching.events,
      providesTags: ['Events'],
    }),

    getEventById: builder.query<Event, number>({
      query: eventId => `${config.fetching.events}/${eventId}`,
      providesTags: (_result, _error, eventId) => [
        { type: 'Event', id: eventId },
      ],
    }),

    getUserEventStatus: builder.query<
      UserEventStatus,
      { eventId: number; userId: number }
    >({
      query: ({ eventId, userId }) =>
        `${config.fetching.events}/${eventId}/user-status/${userId}`,
      providesTags: (_result, _error, { eventId, userId }) => [
        { type: 'UserEventStatus', id: `${eventId}-${userId}` },
      ],
    }),

    // Approvals endpoints
    joinEvent: builder.mutation<Event, { eventId: number; userId: number }>({
      query: ({ eventId, userId }) => ({
        url: `${config.fetching.approvals}/request-join`,
        method: 'POST',
        body: { userId, eventId },
      }),
      invalidatesTags: (_result, _error, { eventId, userId }) => [
        'Events',
        { type: 'Event', id: eventId },
        { type: 'UserEventStatus', id: `${eventId}-${userId}` },
        { type: 'JoinRequests', id: eventId },
      ],
    }),

    getJoinRequests: builder.query<
      JoinRequest[],
      { eventId: number; currentUserId: number }
    >({
      query: ({ eventId, currentUserId }) => ({
        url: `${config.fetching.approvals}/join-requests`,
        method: 'POST',
        body: { eventId, currentUserId },
      }),
      providesTags: (_result, _error, { eventId }) => [
        { type: 'JoinRequests', id: eventId },
      ],
    }),

    setJoinRequestStatus: builder.mutation<
      any,
      {
        eventId: number;
        approverUserId: number;
        targetUserId: number;
        status: 'approved' | 'rejected' | 'pending';
      }
    >({
      query: ({ eventId, approverUserId, targetUserId, status }) => ({
        url: `${config.fetching.approvals}/join-request`,
        method: 'POST',
        body: { eventId, approverUserId, targetUserId, status },
      }),
      invalidatesTags: (_result, _error, { eventId, targetUserId }) => [
        'Events',
        { type: 'Event', id: eventId },
        { type: 'JoinRequests', id: eventId },
        { type: 'UserEventStatus', id: `${eventId}-${targetUserId}` },
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetEventsQuery,
  useGetEventByIdQuery,
  useGetUserEventStatusQuery,
  useJoinEventMutation,
  useGetJoinRequestsQuery,
  useSetJoinRequestStatusMutation,
} = api;
