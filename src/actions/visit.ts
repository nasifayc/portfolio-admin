"use server";

import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

type Props = {
  ip: string;
  userAgent: string;
};

export const createVisitHistory = async ({ ip, userAgent }: Props) => {
  await prisma.visit.create({
    data: { ip, userAgent },
  });
};

export const clearVisitHistory = async () => {
  try {
    await prisma.visit.deleteMany({});
    return { errorMessage: null };
  } catch (e) {
    console.error(e);
    return handleError(e);
  }
};

export const getVisitHistory = async () => {
  try {
    const visits = await prisma.visit.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });
    return visits;
  } catch (e) {
    console.error(e);
    return null;
  }
};
