import axios from 'axios';
import config from '../../config';
import {
  getAccessToken,
  getRefreshToken,
  storeAccessToken,
  storeRefreshToken,
  clearTokens,
} from '@/helpers/tokens';
import axiosNoToken from './axiosNoToken';

// Create axios instance fot checking tokens
const axiosWithToken = axios.create({
  baseURL: config.fetching.base,
});

// Request interceptor to add access token
axiosWithToken.interceptors.request.use(
  async conf => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      conf.headers.Authorization = `Bearer ${accessToken}`;
    }
    return conf;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token refresh
axiosWithToken.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // If error is 401 or 403 (invalid/expired token) and we haven't tried to refresh yet
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          // No refresh token, clear everything and redirect to login
          await clearTokens();
          throw error;
        }

        // Try to refresh the token directly using axiosNoToken
        const response = await axiosNoToken.post(
          `${config.fetching.users}/refresh-token`,
          { refreshToken },
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data;

        // Store new tokens
        await storeAccessToken(newAccessToken);
        await storeRefreshToken(newRefreshToken);

        // Retry the original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosWithToken(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and
        await clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosWithToken;
