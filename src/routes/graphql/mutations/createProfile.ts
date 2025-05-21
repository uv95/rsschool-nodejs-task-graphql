import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull } from 'graphql';
import { ProfileType } from '../types/profile.js';
import { CreateProfileInput } from '../inputs/createProfileInput.js';

interface DTO {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export const CreateProfileMutation = {
  type: ProfileType,
  args: {
    dto: { type: new GraphQLNonNull(CreateProfileInput) },
  },
  async resolve(
    parent,
    args: { dto: DTO },
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    const newProfile = await prisma.profile.create({
      data: {
        isMale: args.dto.isMale,
        yearOfBirth: args.dto.yearOfBirth,
        userId: args.dto.userId,
        memberTypeId: args.dto.memberTypeId,
      },
    });

    return newProfile;
  },
};
