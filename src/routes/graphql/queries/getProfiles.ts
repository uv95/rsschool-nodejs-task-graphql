import { PrismaClient } from '@prisma/client';
import { GraphQLList } from 'graphql';
import { ProfileType } from '../types/profile.js';

export const GetProfilesQuery = {
  type: new GraphQLList(ProfileType),
  async resolve(
    parent,
    args,
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    return await prisma.profile.findMany();
  },
};
