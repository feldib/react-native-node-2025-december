import axios from 'axios';
import config from '../../config';

export const getEvents = async () => {
  try {
    const response = await axios.get(
      `${config.fetching.base}${config.fetching.events}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (eventId: number) => {
  try {
    const response = await axios.get(
      `${config.fetching.base}${config.fetching.events}/${eventId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

export const joinEventApi = async (eventId: number, userId: number) => {
  try {
    await axios.post(
      `${config.fetching.base}${config.fetching.events}/${eventId}/users`,
      { userId },
    );
    // Fetch updated event data
    const response = await axios.get(
      `${config.fetching.base}${config.fetching.events}/${eventId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error joining event:', error);
    throw error;
  }
};
