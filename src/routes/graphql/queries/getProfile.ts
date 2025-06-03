import { PrismaClient } from '@prisma/client';
import { ProfileType } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';

export const GetProfileQuery = {
  type: ProfileType,
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
    return await prisma.profile.findUnique({
      where: { id },
    });
  },
};
