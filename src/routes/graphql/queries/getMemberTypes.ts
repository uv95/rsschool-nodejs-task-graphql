import { PrismaClient } from '@prisma/client';
import { MemberTypeType } from '../types/index.js';
import { GraphQLList } from 'graphql';

export const GetMemberTypesQuery = {
  type: new GraphQLList(MemberTypeType),
  resolve(
    parent,
    args,
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    return prisma.memberType.findMany();
  },
};
