import { PrismaClient } from '@prisma/client';
import { GraphQLList } from 'graphql';
import { PostType } from '../types/post.js';

export const GetPostsQuery = {
  type: new GraphQLList(PostType),
  async resolve(
    parent,
    args,
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    return await prisma.post.findMany();
  },
};
