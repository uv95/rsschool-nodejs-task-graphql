import { PrismaClient } from '@prisma/client';
import { MemberTypeType, UUIDType } from '../types/index.js';

export const GetMemberTypeQuery = {
  type: MemberTypeType,
  args: { d: { type: UUIDType } },
  resolve(
    parent,
    { id }: { id: string },
    {
      prisma,
    }: {
      prisma: PrismaClient;
    },
  ) {
    return prisma.memberType.findUnique({
      where: { id },
    });
  },
};
