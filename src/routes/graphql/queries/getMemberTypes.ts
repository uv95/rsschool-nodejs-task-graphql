import { PrismaClient } from '@prisma/client';
import { GraphQLList } from 'graphql';
import { MemberTypeType } from '../types/memberType.js';

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
