import { PrismaClient } from '@prisma/client';
import { GraphQLList } from 'graphql';
import { UserType } from '../types/user.js';

export const GetUsersQuery = {
  type: new GraphQLList(UserType),
  async resolve(
    parent,
    args,
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    return await prisma.user.findMany();
  },
};
