import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull } from 'graphql';
import { PostType } from '../types/post.js';
import { ChangePostInput } from '../inputs/changePostInput.js';
import { UUIDType } from '../types/uuid.js';

interface DTO {
  title: string;
  content: string;
}

export const ChangePostMutation = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangePostInput) },
  },
  async resolve(
    parent,
    args: { id: string; dto: DTO },
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    const { title, content } = args.dto;
    const updatedPost = await prisma.post.update({
      where: { id: args.id },
      data: { title, content },
    });

    return updatedPost;
  },
};
