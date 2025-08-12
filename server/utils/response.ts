import type { Response } from 'express';
import { BAD_REQUEST, FORBIDDEN, SERVER_ERROR } from './constants';

export const successResponse = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message?: string
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number = 500,
  message: string = 'Unexpected server error',
  type?: string
) => {
  if (!type) {
    if (statusCode === 400) {
      type = BAD_REQUEST;
    } else if (statusCode === 403) {
      type = FORBIDDEN;
    } else if (statusCode === 500) {
      type = SERVER_ERROR;
    }
  }

  return res.status(statusCode).json({
    success: false,
    message,
    type
  });
};
