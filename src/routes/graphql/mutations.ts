import { GraphQLObjectType } from 'graphql';
import {
  ChangePostMutation,
  ChangeProfileMutation,
  ChangeUserMutation,
  CreatePostMutation,
  CreateProfileMutation,
  CreateUserMutation,
  DeletePostMutation,
  DeleteProfileMutation,
  DeleteUserMutation,
  SubscribeToMutation,
  UnsubscribeFromMutation,
} from './mutations/mutations.js';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser: CreateUserMutation,
    createProfile: CreateProfileMutation,
    createPost: CreatePostMutation,
    changePost: ChangePostMutation,
    changeProfile: ChangeProfileMutation,
    changeUser: ChangeUserMutation,
    deleteUser: DeleteUserMutation,
    deletePost: DeletePostMutation,
    deleteProfile: DeleteProfileMutation,
    subscribeTo: SubscribeToMutation,
    unsubscribeFrom: UnsubscribeFromMutation,
  },
});
