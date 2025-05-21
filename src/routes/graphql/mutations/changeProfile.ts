import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull } from 'graphql';
import { ProfileType } from '../types/profile.js';
import { ChangeProfileInput } from '../inputs/changeProfileInput.js';
import { MemberTypeId } from '../../member-types/schemas.js';
import { UUIDType } from '../types/uuid.js';

interface DTO {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: MemberTypeId;
}

export const ChangeProfileMutation = {
  type: ProfileType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeProfileInput) },
  },
  async resolve(
    parent,
    args: { id: string; dto: DTO },
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    const { isMale, yearOfBirth, memberTypeId } = args.dto;
    const updatedProfile = await prisma.profile.update({
      where: { id: args.id },
      data: { isMale, yearOfBirth, memberTypeId },
    });

    return updatedProfile;
  },
};
