import { PrismaClient } from '@prisma/client';
import { GraphQLList } from 'graphql';
import { UserType } from '../types/index.js';

export const GetUsersQuery = {
  type: new GraphQLList(UserType),
  resolve(
    parent,
    args,
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    return prisma.user.findMany();
  },
};
