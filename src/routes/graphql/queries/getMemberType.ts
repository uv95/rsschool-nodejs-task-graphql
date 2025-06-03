import { PrismaClient } from '@prisma/client';
import { MemberTypeType } from '../types/memberType.js';
import { MemberTypeIdType } from '../types/memberTypeId.js';

export const GetMemberTypeQuery = {
  type: MemberTypeType,
  args: { id: { type: MemberTypeIdType } },
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
