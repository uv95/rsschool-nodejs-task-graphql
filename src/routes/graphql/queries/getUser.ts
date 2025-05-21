import { PrismaClient } from '@prisma/client';
import { UserType } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';

export const GetUserQuery = {
  type: UserType,
  args: { id: { type: UUIDType } },
  async resolve(
    parent,
    { id }: { id: string },
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    return await prisma.user.findUnique({
      where: { id },
    });
  },
};
