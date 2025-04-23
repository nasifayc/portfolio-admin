"use server";

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { deleteImage } from "./storage";

type TechstackProps = {
  name: string;
  imageUrl: string;
  tag: "frontend" | "backend" | "mobile" | "DevOps" | "baas" | "saas";
};

export const createSkill = async ({ name, imageUrl, tag }: TechstackProps) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("Unauthorised");

    await prisma.techStack.create({
      data: {
        name,
        imageUrl,
        tag,
      },
    });

    return { errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};

export const getAllSkills = async () => {
  try {
    const skills = await prisma.techStack.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { skills, errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};

export const getSkillById = async (id: string) => {
  try {
    const skill = await prisma.techStack.findUnique({
      where: { id },
    });

    if (!skill) throw new Error("No such skill");
    return { skill };
  } catch {
    return { skill: undefined };
  }
};

export const updateSkill = async (
  id: string,
  { name, imageUrl, tag }: TechstackProps,
) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("Unauthorised");
    await prisma.techStack.update({
      where: { id },
      data: { name, imageUrl, tag },
    });

    return { errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};

export const deleteSkill = async (id: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("Unauthorised");
    const { skill } = await getSkillById(id);
    if (!skill) throw new Error("No such skill");
    if (skill.imageUrl) {
      const { error } = await deleteImage(skill.imageUrl);
      if (error) throw new Error("Failed to delete image");
    }
    await prisma.techStack.delete({ where: { id } });

    return { errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};
