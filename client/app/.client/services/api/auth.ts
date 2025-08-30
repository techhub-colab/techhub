import api from '~/.client/services/api';
import type { LoginFormValues, LoginResponse } from '~/types/auth';
import type { SuccessResponse } from '~/types/success';

export const login = async (credentials: LoginFormValues) => {
  const { data } = await api.post<LoginResponse>('/auth/login', credentials);
  return data;
};

export const logout = async () => {
  const { data } = await api.post<SuccessResponse>('/auth/logout');
  return data;
};
