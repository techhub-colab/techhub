import api from '~/.client/services/api';
import type { LoginRequest, LoginResponse } from '~/types/auth';
import type { SuccessResponse } from '~/types/success';

export const login = async (credentials: LoginRequest) => {
  const { data } = await api.post<LoginResponse>('/auth/login', credentials);
  return data;
};

export const logout = async () => {
  const { data } = await api.post<SuccessResponse>('/auth/logout');
  return data;
};
