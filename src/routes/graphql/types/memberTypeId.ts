import { GraphQLEnumType } from 'graphql';
import { MemberTypeId } from '../../member-types/schemas.js';

export const MemberTypeIdType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: MemberTypeId.BASIC },
    BUSINESS: { value: MemberTypeId.BUSINESS },
  },
});
