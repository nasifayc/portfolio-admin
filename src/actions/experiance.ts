"use server";

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { deleteImage } from "./storage";

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

    return { experience };
  } catch (e) {
    return { experience: undefined };
  }
};

export const updateExperience = async (
  id: string,
  {
    companyName,
    companyImage,
    startingDate,
    endDate,
    stillWorking,
    description,
    role,
  }: ExperienceProps,
) => {
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

    const { experience } = await getExperienceById(id);
    if (!experience) throw new Error("Experience not found");
    if (experience.companyImage) {
      const { error } = await deleteImage(experience.companyImage);
      if (error) throw new Error("Failed to delete image");
    }

    await prisma.experience.delete({ where: { id } });
    return { errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};
