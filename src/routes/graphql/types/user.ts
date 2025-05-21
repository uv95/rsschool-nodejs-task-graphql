import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';
import { PrismaClient, User } from '@prisma/client';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: (parent: User, args, { prisma }: { prisma: PrismaClient }) =>
        prisma.profile.findUnique({ where: { userId: parent.id } }),
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: (parent: User, args, { prisma }: { prisma: PrismaClient }) =>
        prisma.post.findMany({ where: { authorId: parent.id } }),
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: (parent: User, args, { prisma }: { prisma: PrismaClient }) =>
        prisma.user.findMany({
          where: { subscribedToUser: { some: { subscriberId: parent.id } } },
        }),
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: (parent: User, args, { prisma }: { prisma: PrismaClient }) =>
        prisma.user.findMany({
          where: { userSubscribedTo: { some: { authorId: parent.id } } },
        }),
    },
  }),
});
