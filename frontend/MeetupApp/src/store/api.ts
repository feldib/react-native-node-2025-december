import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/types/db/User';
import { Event } from '@/types/db/Event';
import config from '../../config';

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
  //   token: string;
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

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: config.fetching.base,
    prepareHeaders: (headers, { getState: _ }) => {
      // You can add auth token here if needed
      // const token = (getState() as RootState).auth.token;
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`);
      // }
      return headers;
    },
  }),
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
        invalidatesTags: ['Auth'],
      },
    ),

    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: userData => ({
        url: `${config.fetching.users}/register`,
        method: 'POST',
        body: userData,
      }),
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
  useGetEventsQuery,
  useGetEventByIdQuery,
  useGetUserEventStatusQuery,
  useJoinEventMutation,
  useGetJoinRequestsQuery,
  useSetJoinRequestStatusMutation,
} = api;
