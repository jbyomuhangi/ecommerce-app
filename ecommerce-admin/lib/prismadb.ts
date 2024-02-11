import { PrismaClient } from "@prisma/client";

const globalThisWithPrisma = global as typeof globalThis & {
  prisma: PrismaClient | undefined;
};

const prismaDb = globalThisWithPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThisWithPrisma.prisma = prismaDb;
}

export default prismaDb;
