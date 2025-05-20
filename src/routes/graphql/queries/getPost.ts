import { PrismaClient } from '@prisma/client';
import { PostType, UUIDType } from '../types/index.js';

export const GetPostQuery = {
  type: PostType,
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
    return prisma.post.findUnique({
      where: { id },
    });
  },
};
