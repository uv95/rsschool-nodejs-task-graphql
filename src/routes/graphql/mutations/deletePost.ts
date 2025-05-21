import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { PostType } from '../types/post.js';

export const DeletePostMutation = {
  type: PostType,
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
    return null;
  },
};
