import api from '~/.client/services/api';
import type { User } from '~/types/user';

export const getMe = async () => {
  const { data: user } = await api.get<User>('/users/me');
  return user;
};