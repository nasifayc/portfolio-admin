import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

type ExperienceProps = {
  companyName: string;
  companyImage: string;
  startingDate: Date;
  endDate?: Date;
  stillWorking: boolean;
  description: string;
  role: string[];
};

export const createExperience = async ({
  companyName,
  companyImage,
  startingDate,
  endDate,
  stillWorking,
  description,
  role,
}: ExperienceProps) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("User not found");

    await prisma.experience.create({
      data: {
        companyName,
        companyImage,
        startingDate,
        endDate,
        stillWorking,
        description,
        role,
      },
    });
    return { errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};

export const getExperiences = async () => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { startingDate: "desc" },
    });

    return { errorMessage: null, experiences };
  } catch (e) {
    return handleError(e);
  }
};

export const getExperienceById = async (id: string) => {
  try {
    const experience = await prisma.experience.findUnique({ where: { id } });

    if (!experience) throw new Error("Experience not found");

    return { errorMessage: null, experience };
  } catch (e) {
    return handleError(e);
  }
};

type UpdateExperienceProps = {
  id: string;
  companyName?: string;
  companyImage?: string;
  startingDate?: Date;
  endDate?: Date;
  stillWorking?: boolean;
  description?: string;
  role?: string[];
};

export const updateExperience = async ({
  id,
  companyName,
  companyImage,
  startingDate,
  endDate,
  stillWorking,
  description,
  role,
}: UpdateExperienceProps) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        companyName,
        companyImage,
        startingDate,
        endDate,
        stillWorking,
        description,
        role,
      },
    });

    return { errorMessage: null, experience };
  } catch (e) {
    return handleError(e);
  }
};

export const deleteExperience = async (id: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    await prisma.experience.delete({ where: { id } });

    return { errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};
