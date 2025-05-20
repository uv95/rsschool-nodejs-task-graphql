import { PrismaClient } from '@prisma/client';
import { MemberTypeType } from '../types/memberType.js';
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
