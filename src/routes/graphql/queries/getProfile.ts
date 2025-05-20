import { PrismaClient } from '@prisma/client';
import { ProfileType, UUIDType } from '../types/index.js';

export const GetProfileQuery = {
  type: ProfileType,
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
    return prisma.profile.findUnique({
      where: { id },
    });
  },
};
