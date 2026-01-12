import axiosWithToken from '@/lib/axiosWithToken';
import config from '../../config';
import axiosNoToken from '@/lib/axiosNoToken';

export const getEvents = async () => {
  try {
    const response = await axiosNoToken.get(`${config.fetching.events}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (eventId: number) => {
  try {
    const response = await axiosWithToken.get(
      `${config.fetching.events}/${eventId}`,
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching event:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw error;
  }
};

export const joinEventApi = async (eventId: number, userId: number) => {
  try {
    await axiosWithToken.post(`${config.fetching.approvals}/request-join`, {
      userId,
      eventId,
    });
    // Fetch updated event data
    const response = await axiosWithToken.get(
      `${config.fetching.events}/${eventId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error joining event:', error);
    throw error;
  }
};

export const getJoinRequestsApi = async (
  eventId: number,
  currentUserId: number,
) => {
  try {
    const response = await axiosWithToken.post(
      `${config.fetching.approvals}/join-requests`,
      { eventId, currentUserId },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching join requests:', error);
    throw error;
  }
};

export const setJoinRequestApi = async (
  eventId: number,
  approverUserId: number,
  targetUserId: number,
  status: 'approved' | 'rejected' | 'pending',
) => {
  try {
    const response = await axiosWithToken.post(
      `${config.fetching.approvals}/join-request`,
      { eventId, approverUserId, targetUserId, status },
    );
    return response.data;
  } catch (error) {
    console.error('Error setting join request status:', error);
    throw error;
  }
};

export const getUserEventStatusApi = async (
  eventId: number,
  userId: number,
) => {
  try {
    const response = await axiosWithToken.get(
      `${config.fetching.events}/${eventId}/user-status/${userId}`,
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user event status:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw error;
  }
};
