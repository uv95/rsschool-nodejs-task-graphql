import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from 'graphql';
import { MemberTypeIdType } from '../types/memberTypeId.js';

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdType },
  },
});
