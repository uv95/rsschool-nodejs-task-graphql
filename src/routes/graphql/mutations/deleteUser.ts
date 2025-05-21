import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const DeleteUserMutation = {
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
    await prisma.user.delete({ where: { id } });
    return 'User deleted successfully';
  },
};
