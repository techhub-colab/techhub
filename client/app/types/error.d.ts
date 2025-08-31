export type ErrorResponse = {
  message: string;
  code?: 'INACTIVE_USER' | 'USERNAME_EXISTS' | 'EMAIL_EXISTS'
}
