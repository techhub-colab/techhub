import { Prisma, PrismaClient } from '@/generated/prisma/client.js';
import { hashPassword } from '@/utils/password.js';

const isProduction = process.env.NODE_ENV === 'production';
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const options: Prisma.PrismaClientOptions | undefined =
  isProduction ? undefined : {
    log: ['query'],
    omit: {
      user: {
        password: true
      }
    }
  };

// noinspection JSUnusedGlobalSymbols
const preSaveExtension = Prisma.defineExtension({
  // Extend queries on operations of certain models
  query: {
    user: {
      async $allOperations({ operation, args, query }) {
        if (operation === 'create' || operation === 'update') {
          // Ensure the user email is always saved in lower case
          if (typeof args.data.email === 'string') {
            args.data.email = args.data.email.toLowerCase();
          }

          // Hash the password if provided
          if (typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password);
          }
        }

        return query(args);
      }
    }
  }
});

const prisma = globalForPrisma.prisma ||
  new PrismaClient(options)
    .$extends(preSaveExtension);

if (!isProduction) {
  globalForPrisma.prisma = prisma;
}

export default prisma;
