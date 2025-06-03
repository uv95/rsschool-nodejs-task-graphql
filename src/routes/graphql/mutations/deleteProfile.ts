import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const DeleteProfileMutation = {
  type: new GraphQLNonNull(GraphQLString),
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
    return 'Profile deleted successfully';
  },
};
