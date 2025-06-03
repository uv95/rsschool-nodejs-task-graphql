import { PrismaClient } from '@prisma/client';
import { UserType } from '../types/user.js';
import { GraphQLNonNull } from 'graphql';
import { CreateUserInput } from '../inputs/createUserInput.js';

interface DTO {
  name: string;
  balance: number;
}

export const CreateUserMutation = {
  type: UserType,
  args: {
    dto: { type: new GraphQLNonNull(CreateUserInput) },
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
    const newUser = await prisma.user.create({
      data: {
        name: args.dto.name,
        balance: args.dto.balance,
      },
    });

    return newUser;
  },
};
