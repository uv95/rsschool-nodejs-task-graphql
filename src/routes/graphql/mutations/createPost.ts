import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull } from 'graphql';
import { CreatePostInput } from '../inputs/createPostInput.js';
import { PostType } from '../types/post.js';

interface DTO {
  title: string;
  content: string;
  authorId: string;
}

export const CreatePostMutation = {
  type: PostType,
  args: {
    dto: { type: new GraphQLNonNull(CreatePostInput) },
  },
  async resolve(
    parent,
    args: { dto: DTO },
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    const newPost = await prisma.post.create({
      data: {
        title: args.dto.title,
        content: args.dto.content,
        authorId: args.dto.authorId,
      },
    });

    return newPost;
  },
};
