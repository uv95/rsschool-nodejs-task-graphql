import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeType } from './memberType.js';
import { PrismaClient, Profile } from '@prisma/client';
import { ProfileLoaders } from '../dataloaders/profileLoaders.js';

interface Context {
  loaders: {
    profile: ProfileLoaders;
  };
}

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(MemberTypeType),
      async resolve(parent: Profile, args, { loaders }: Context) {
        return loaders.profile.memberTypeByProfileId.load(parent.id);
      },
    },
  }),
});
