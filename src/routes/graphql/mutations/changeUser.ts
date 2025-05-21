import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull } from 'graphql';
import { UserType } from '../types/user.js';
import { ChangeUserInput } from '../inputs/changeUserInput.js';
import { UUIDType } from '../types/uuid.js';
interface DTO {
  name: string;
  balance: number;
}

export const ChangeUserMutation = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeUserInput) },
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
    const { name, balance } = args.dto;
    const updatedUser = await prisma.user.update({
      where: { id: args.id },
      data: { name, balance },
    });

    return updatedUser;
  },
};
