import { User } from '@prisma/client';
import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UserLoaders } from '../dataloaders/userLoaders.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { UUIDType } from './uuid.js';

interface Context {
  loaders: {
    user: UserLoaders;
  };
}

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: async (parent: User, args, { loaders }: Context) =>
        loaders.user.profileByUserId.load(parent.id),
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: async (parent: User, args, { loaders }: Context) =>
        loaders.user.postsByUserId.load(parent.id),
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (parent: User, args, { loaders }: Context) =>
        loaders.user.userSubscribedTo.load(parent.id),
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (parent: User, args, { loaders }: Context) =>
        loaders.user.subscribedToUser.load(parent.id),
    },
  }),
});
