import api from '~/.client/services/api';
import type { User } from '~/types/user';

export const getMe = async () => {
  const { data: user } = await api.get<User>('/users/me');
  return user;
};

export const updateMe = async (values: Partial<User>) => {
  const { data: updatedUser } = await api.patch<User>('/users/me', values);
  return updatedUser;
};
