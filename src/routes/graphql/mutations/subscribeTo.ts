import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';

interface Args {
  userId: string;
  authorId: string;
}

export const SubscribeToMutation = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  async resolve(
    parent,
    args: Args,
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    const { userId, authorId } = args;
    await prisma.subscribersOnAuthors.create({
      data: {
        subscriberId: userId,
        authorId: authorId,
      },
    });

    return 'Subscription created successfully';
  },
};
