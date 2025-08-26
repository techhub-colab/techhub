import { BASE_API_PATH } from '~/constants';

export const getBaseUrl = (req: Request) => {
  const url = new URL(req.url);
  return url.origin;
};

export const getBaseApiUrl = (req: Request) => {
  const url = new URL(req.url);
  return `${url.origin}${BASE_API_PATH}`;
};
