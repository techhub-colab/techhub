export type ErrorResponse = {
  message: string;
  code?: 'USERNAME_EXISTS' | 'EMAIL_EXISTS'
}
