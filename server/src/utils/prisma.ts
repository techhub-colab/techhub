import { PrismaClient } from '@/generated/prisma/client.js';

const isProduction = process.env.NODE_ENV === 'production';
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma ||
  new PrismaClient(isProduction ? undefined : {
    log: ['query'],
    omit: {
      user: {
        password: true
      }
    }
  });

if (!isProduction) {
  globalForPrisma.prisma = prisma;
}

export default prisma;
