import axiosNoToken from '@/lib/axiosNoToken';
import config from '../../config';
import {
  storeAccessToken,
  storeRefreshToken,
  clearTokens,
} from '@/helpers/tokens';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosNoToken.post(`${config.fetching.users}/login`, {
      email,
      password,
    });

    console.log('Login response received:', {
      hasAccessToken: !!response.data.accessToken,
      hasRefreshToken: !!response.data.refreshToken,
    });

    const { accessToken, refreshToken } = response.data;

    // Store tokens securely
    await storeAccessToken(accessToken);
    await storeRefreshToken(refreshToken);

    console.log('Tokens stored successfully');

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
    const response = await axiosNoToken.post(
      `${config.fetching.users}/register`,
      userData,
    );

    const { accessToken, refreshToken } = response.data;

    // Store tokens securely
    await storeAccessToken(accessToken);
    await storeRefreshToken(refreshToken);

    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    // Get refresh token for logout
    const { getRefreshToken } = await import('@/helpers/tokens');
    const refreshToken = await getRefreshToken();

    console.log('Logging out, refreshToken exists:', !!refreshToken);

    if (refreshToken) {
      // Call backend logout endpoint
      await axiosNoToken.post(`${config.fetching.users}/logout`, {
        refreshToken,
      });
    }

    // Clear tokens from device
    await clearTokens();
    console.log('Tokens cleared from device');
  } catch (error) {
    console.error('Error logging out:', error);
    // Clear tokens anyway even if backend call fails
    await clearTokens();
    throw error;
  }
};
