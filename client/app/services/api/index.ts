import axios, { type AxiosError } from 'axios';
import { BASE_API_URL } from '~/constants';
import type { ErrorResponse } from '~/types/error';

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// send the access token along with every request
api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

// Centralised error handler
api.interceptors.response.use(
  res => res,
  async (err: AxiosError<ErrorResponse>) => {
    if (!err.response) {
      return Promise.reject(err);
    }

    const statusCode = err.response.status;
    const errorMessage = err.response.data.message;

    if (statusCode === 401) {
      if (err.config?.url === '/auth/login' || err.config?.url === '/auth/refresh-token') {
        // propagate failed login and refresh token error
        err.message = errorMessage;
        return Promise.reject(err);
      }

      try {
        // request to refresh token
        const refreshResponse = await api.post<{ accessToken: string }>('/auth/refresh-token');
        const { accessToken } = refreshResponse.data;
        // store the new access token
        localStorage.setItem('accessToken', accessToken);
        // retry the previous request
        // expect no further 401 error
        return api.request(err.config!);

      } catch (refreshError) {
        if (axios.isAxiosError(refreshError)) {
          refreshError.message = 'Session expired, please log in again.';
        }
        return Promise.reject(refreshError);
      }

    } else if (statusCode === 403) {
      err.message = 'Permission denied';
    } else if (statusCode === 404) {
      err.message = 'Resource not found';
    } else if (statusCode >= 500) {
      err.message = 'Server error. Please try again later.';
    } else {
      err.message = errorMessage;
    }

    // still throw the error for specific cases to handle
    return Promise.reject(err);
  }
);

export default api;
