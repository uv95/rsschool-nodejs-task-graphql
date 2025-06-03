import { PrismaClient, User } from '@prisma/client';
import { GraphQLList, GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';
import { UserType } from '../types/user.js';
import { UserLoaders } from '../dataloaders/userLoaders.js';

export const GetUsersQuery = {
  type: new GraphQLList(UserType),
  async resolve(
    parent,
    args,
    {
      prisma,
      loaders,
    }: {
      prisma: PrismaClient;
      loaders: UserLoaders;
    },
    resolveInfo: GraphQLResolveInfo,
  ) {
    const parsedInfo = parseResolveInfo(resolveInfo) as ResolveTree;
    const includeSubscribedToUser =
      !!parsedInfo?.fieldsByTypeName?.User?.subscribedToUser;
    const includeUserSubscribedTo =
      !!parsedInfo?.fieldsByTypeName?.User?.userSubscribedTo;

    const users = await prisma.user.findMany({
      include: {
        subscribedToUser: includeSubscribedToUser,
        userSubscribedTo: includeUserSubscribedTo,
      },
    });

    return users;
  },
};
