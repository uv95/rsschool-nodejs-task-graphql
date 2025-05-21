import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../types/profile.js';

export const DeleteProfileMutation = {
  type: ProfileType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  async resolve(
    parent,
    { id }: { id: string },
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    await prisma.profile.delete({ where: { id } });
    return null;
  },
};
