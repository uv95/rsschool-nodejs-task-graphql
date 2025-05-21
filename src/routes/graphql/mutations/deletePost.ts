import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const DeletePostMutation = {
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
    await prisma.post.delete({ where: { id } });
    return 'Post deleted successfully';
  },
};
