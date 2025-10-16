import type { SignupRequest } from '@/schemas/auth.js';
import type { UpdateMeRequest } from '@/schemas/user.js';
import { isValidEmail, isValidPassword, isValidUsername } from '@/utils/validation.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export const saveUserHook = async (req: FastifyRequest<{
  Body: SignupRequest | UpdateMeRequest
}>, res: FastifyReply) => {
  const { username, password, email } = req.body;

  // Validate fields format
  let isValidInput = false;

  if (username && !isValidUsername(username)) {
    req.log.error(`Invalid username: ${username}`);
  } else if (password && !isValidPassword(password)) {
    req.log.debug(`Invalid password: ${password}`);
    req.log.error('Invalid password');
  } else if (email && !isValidEmail(email)) {
    req.log.error(`Invalid email: ${email}`);
  } else {
    isValidInput = true;
  }

  if (!isValidInput) {
    return res.status(400).send({ message: 'Bad request' });
  }

  return;
};
