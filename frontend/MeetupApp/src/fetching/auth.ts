import axios from 'axios';
import config from '../../config';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${config.fetching.base}${config.fetching.users}/login`,
      { email, password },
    );
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  description?: string;
}) => {
  try {
    const response = await axios.post(
      `${config.fetching.base}${config.fetching.users}/register`,
      userData,
    );
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};
