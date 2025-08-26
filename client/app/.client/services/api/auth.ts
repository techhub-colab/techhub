import api from '~/.client/services/api';
import type { LoginRequest, LoginResponse } from '~/types/auth';

export const login = async (credentials: LoginRequest) => {
  const { data } = await api.post<LoginResponse>('/auth/login', credentials);
  return data;
};
