import { MemberType, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export interface ProfileLoaders {
  memberTypeByProfileId: DataLoader<string, MemberType | null>;
}

export function createProfileLoaders(prisma: PrismaClient): ProfileLoaders {
  return {
    memberTypeByProfileId: new DataLoader<string, MemberType | null>(
      async (profileIds) => {
        const memberTypes = await prisma.memberType.findMany({
          where: { profiles: { some: { id: { in: profileIds as string[] } } } },
          include: { profiles: true },
        });

        const profileIdToMemberType = new Map<string, MemberType>();

        for (const mt of memberTypes) {
          for (const profile of mt.profiles) {
            profileIdToMemberType.set(profile.id, mt);
          }
        }

        return profileIds.map((id) => profileIdToMemberType.get(id) || null);
      },
    ),
  };
}
