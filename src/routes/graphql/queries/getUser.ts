import { PrismaClient } from '@prisma/client';
import { UserType, UUIDType } from '../types/index.js';

export const GetUserQuery = {
  type: UserType,
  args: { id: { type: UUIDType } },
  resolve(
    parent,
    { id }: { id: string },
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    return prisma.user.findUnique({
      where: { id },
    });
  },
};
