import { PrismaClient } from '../generated/prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
const prisma = globalForPrisma.prisma ||
  new PrismaClient().$extends({
    // Extend queries on operations of certain models
    query: {
      user: {
        $allOperations({ model, operation, args, query }) {
          // Ensure the user email is always saved in lower case
          if (operation === 'create' || operation === 'update') {
            if (typeof args.data.email === 'string') {
              args.data.email = args.data.email.toLowerCase();
            }
          }
          return query(args);
        }
      }
    }
  });

if (process.env.NODE_ENV === 'development') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
