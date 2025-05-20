import { PrismaClient } from '@prisma/client';
import { GraphQLObjectType } from 'graphql';
import {
  GetMemberTypeQuery,
  GetMemberTypesQuery,
  GetPostQuery,
  GetPostsQuery,
  GetProfileQuery,
  GetProfilesQuery,
  GetUserQuery,
  GetUsersQuery,
} from './queries/index.js';

export interface Context {
  prisma: PrismaClient;
}

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    memberTypes: GetMemberTypesQuery,
    memberType: GetMemberTypeQuery,
    users: GetUsersQuery,
    user: GetUserQuery,
    posts: GetPostsQuery,
    post: GetPostQuery,
    profiles: GetProfilesQuery,
    profile: GetProfileQuery,
  }),
});
