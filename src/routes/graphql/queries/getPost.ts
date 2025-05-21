import { PrismaClient } from '@prisma/client';
import { PostType } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';

export const GetPostQuery = {
  type: PostType,
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
    return await prisma.post.findUnique({
      where: { id },
    });
  },
};
