import DataLoader from 'dataloader';
import { PrismaClient, Profile, Post, User } from '@prisma/client';

export interface UserLoaders {
  profileByUserId: DataLoader<string, Profile | null>;
  postsByUserId: DataLoader<string, Post[]>;
  userSubscribedTo: DataLoader<string, User[]>;
  subscribedToUser: DataLoader<string, User[]>;
}

export function createUserLoaders(prisma: PrismaClient): UserLoaders {
  return {
    profileByUserId: new DataLoader<string, Profile | null>(async (userIds) => {
      const profiles = await prisma.profile.findMany({
        where: { userId: { in: userIds as string[] } },
      });
      const profileMap = new Map(profiles.map((profile) => [profile.userId, profile]));

      return userIds.map((id) => profileMap.get(id) || null);
    }),

    postsByUserId: new DataLoader<string, Post[]>(async (userIds) => {
      const posts = await prisma.post.findMany({
        where: { authorId: { in: userIds as string[] } },
      });

      return userIds.map((id) => posts.filter((post) => post.authorId === id));
    }),

    userSubscribedTo: new DataLoader<string, User[]>(async (userIds) => {
      const subscribersOnAuthors = await prisma.subscribersOnAuthors.findMany({
        where: { subscriberId: { in: userIds as string[] } },
        include: { author: true },
      });

      return userIds.map((id) =>
        subscribersOnAuthors
          .filter((subscriber) => subscriber.subscriberId === id)
          .map((record) => record.author),
      );
    }),

    subscribedToUser: new DataLoader<string, User[]>(async (userIds) => {
      const subscribersOnAuthors = await prisma.subscribersOnAuthors.findMany({
        where: { authorId: { in: userIds as string[] } },
        include: { subscriber: true },
      });

      return userIds.map((id) =>
        subscribersOnAuthors
          .filter((author) => author.authorId === id)
          .map((record) => record.subscriber),
      );
    }),
  };
}
