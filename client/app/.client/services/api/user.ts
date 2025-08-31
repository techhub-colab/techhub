import api from '~/.client/services/api';
import type { PersonalDetailsFormValues, ResetPasswordFormValues } from '~/types/settings';
import type { User } from '~/types/user';

export const getMe = async () => {
  const { data: user } = await api.get<User>('/users/me');
  return user;
};

export const updateMe = async (values: PersonalDetailsFormValues | ResetPasswordFormValues) => {
  const { data: updatedUser } = await api.patch<User>('/users/me', values);
  return updatedUser;
};
