export const BASE_API_PATH = '/api';

export const ACCESS_TOKEN_NAME = 'accessToken';
export const REFRESH_TOKEN_NAME = 'refreshToken';
export const REFRESH_TOKEN_PATH = `${BASE_API_PATH}/auth/refresh-token`;

export const reservedUsernames = new Set([
  // website page names
  'about',
  'login',
  'contact',
  'blogs',
  'admin',
  // api names
  'api',
  'me'
]);

// Error types
export const INVALID_TOKEN = 'INVALID_TOKEN';
export const INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';
export const SESSION_EXPIRED = 'SESSION_EXPIRED';
export const ILLEGAL_USER = 'ILLEGAL_USER';
export const FORBIDDEN = 'FORBIDDEN';
export const USERNAME_EXISTS = 'USERNAME_EXISTS';
export const EMAIL_EXISTS = 'EMAIL_EXISTS';
export const BAD_REQUEST = 'BAD_REQUEST';
export const SERVER_ERROR = 'SERVER_ERROR';

