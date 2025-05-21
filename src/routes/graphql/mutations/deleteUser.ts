import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../types/user.js';

export const DeleteUserMutation = {
  type: UserType,
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
    await prisma.user.delete({ where: { id } });
    return null;
  },
};
