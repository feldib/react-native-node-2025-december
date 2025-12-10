import axios from 'axios';
import config from '../../config';

export const getEvents = async () => {
  try {
    const response = await axios.get(
      `${config.fetching.base}${config.fetching.events}`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return null;
  }
};
