import { PrismaClient } from '@prisma/client';
import { GraphQLObjectType, GraphQLList } from 'graphql';
import { MemberTypeType } from './memberType.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { UserType } from './user.js';
import { UUIDType } from './uuid.js';

export interface Context {
  prisma: PrismaClient;
}

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(MemberTypeType),
      args: {},
      resolve(parent, args, { prisma }: Context) {
        return prisma.memberType.findMany();
      },
    },
    memberType: {
      type: MemberTypeType,
      args: { id: { type: UUIDType } },
      resolve(parent, { id }: { id: string }, { prisma }: Context) {
        return prisma.memberType.findUnique({
          where: { id },
        });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args, { prisma }: Context) {
        return prisma.user.findMany();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: UUIDType } },
      resolve(parent, { id }: { id: string }, { prisma }: Context) {
        return prisma.user.findUnique({
          where: { id },
        });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args, { prisma }: Context) {
        return prisma.post.findMany();
      },
    },
    post: {
      type: PostType,
      args: { id: { type: UUIDType } },
      resolve(parent, { id }: { id: string }, { prisma }: Context) {
        return prisma.post.findUnique({
          where: { id },
        });
      },
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve(parent, args, { prisma }: Context) {
        return prisma.profile.findMany();
      },
    },
    profile: {
      type: ProfileType,
      args: { id: { type: UUIDType } },
      resolve(parent, { id }: { id: string }, { prisma }: Context) {
        return prisma.profile.findUnique({
          where: { id },
        });
      },
    },
  }),
});
