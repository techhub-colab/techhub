/**
 * Allowed characters in the provided password:
 * * English letters and digits;
 * * Special characters including: `._!@#$%^&*()[]-+=`
 * <br>
 * The required password length is 8-30.
 * @param password
 */
export const isValidPassword = (password: string): boolean => {
  const regex = /^[a-zA-Z0-9._!@#$%^&*()[\]\-+=]{8,30}$/;
  return regex.test(password);
};
