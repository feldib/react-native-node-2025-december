import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getEvents,
  getEventById,
  joinEventApi,
  getJoinRequestsApi,
  setJoinRequestApi,
  getUserEventStatusApi,
} from '@/fetching/events';

// Query keys
export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: () => [...eventKeys.lists()] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: number) => [...eventKeys.details(), id] as const,
  joinRequests: (eventId: number, userId: number) =>
    [...eventKeys.all, 'joinRequests', eventId, userId] as const,
  userStatus: (eventId: number, userId: number) =>
    [...eventKeys.all, 'userStatus', eventId, userId] as const,
};

// Fetch all events
export const useEventsQuery = () => {
  return useQuery({
    queryKey: eventKeys.list(),
    queryFn: async () => {
      const events = await getEvents();
      return events;
    },
  });
};

// Fetch single event by ID
export const useEventQuery = (eventId: number) => {
  return useQuery({
    queryKey: eventKeys.detail(eventId),
    queryFn: async () => {
      return await getEventById(eventId);
    },
    enabled: !!eventId,
  });
};

// Join event mutation
export const useJoinEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      eventId,
      userId,
    }: {
      eventId: number;
      userId: number;
    }) => {
      return await joinEventApi(eventId, userId);
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch event details
      queryClient.invalidateQueries({
        queryKey: eventKeys.detail(variables.eventId),
      });
      // Invalidate events list
      queryClient.invalidateQueries({ queryKey: eventKeys.list() });
      // Invalidate user event status
      queryClient.invalidateQueries({
        queryKey: eventKeys.userStatus(variables.eventId, variables.userId),
      });
    },
  });
};

// Fetch join requests
export const useJoinRequestsQuery = (
  eventId: number,
  currentUserId: number,
) => {
  return useQuery({
    queryKey: eventKeys.joinRequests(eventId, currentUserId),
    queryFn: async () => {
      return await getJoinRequestsApi(eventId, currentUserId);
    },
    enabled: !!eventId && !!currentUserId,
  });
};

// Set join request status mutation
export const useSetJoinRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      eventId,
      approverUserId,
      targetUserId,
      status,
    }: {
      eventId: number;
      approverUserId: number;
      targetUserId: number;
      status: 'approved' | 'rejected' | 'pending';
    }) => {
      return await setJoinRequestApi(
        eventId,
        approverUserId,
        targetUserId,
        status,
      );
    },
    onSuccess: (data, variables) => {
      // Invalidate join requests
      queryClient.invalidateQueries({
        queryKey: eventKeys.joinRequests(
          variables.eventId,
          variables.approverUserId,
        ),
      });
      // Invalidate event details
      queryClient.invalidateQueries({
        queryKey: eventKeys.detail(variables.eventId),
      });
    },
  });
};

// Fetch user event status
export const useUserEventStatusQuery = (eventId: number, userId: number) => {
  return useQuery({
    queryKey: eventKeys.userStatus(eventId, userId),
    queryFn: async () => {
      return await getUserEventStatusApi(eventId, userId);
    },
    enabled: !!eventId && !!userId,
  });
};
