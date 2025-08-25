import api from '~/services/api';
import type { LoginRequest, LoginResponse } from '~/schemas/auth';

export const login = async (credentials: LoginRequest) => {
  const { data } = await api.post<LoginResponse>('/auth/login', credentials);
  return data;
};
