import isEmail from 'validator/lib/isEmail';
import { reservedUsernames } from './constants';

/**
 * The provided username must:
 * * Be of length between 4-30 characters;
 * * Contains at least one English character;
 * * Contains only English letters, digits, underscores and periods.
 * @param username
 * @returns {boolean}
 */
export const isValidUsername = (username: string): boolean => {
  const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_.]{4,30}$/;
  return !reservedUsernames.has(username.toLowerCase()) && regex.test(username);
};

/**
 * Allowed characters in the provided password:
 * * English letters and digits;
 * * Special characters including: `._!@#$%^&*()[]-+=`
 * <br>
 * The required password length is 8-30.
 * @param password
 */
export const isValidPassword = (password: string): boolean => {
  const regex = /^[a-zA-Z0-9._!@#$%^&*()\[\]\-+=]{8,30}$/;
  return regex.test(password);
};

export const isValidEmail = (email: string): boolean => {
  return isEmail(email);
};
