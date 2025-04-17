"use server";

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

type ProjectProps = {
  title: string;
  description: string;
  githubLink: string;
  liveDemo: string;
  imageUrl: string;
  techStack: string[];
};

type UpdateProjectProps = {
  id: string;
  title?: string;
  description?: string;
  githubLink?: string;
  liveDemo?: string;
  imageUrl?: string;
  techStack?: string[];
};

export const createProject = async ({
  title,
  description,
  githubLink,
  liveDemo,
  imageUrl,
  techStack,
}: ProjectProps) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("User not found");
    await prisma.project.create({
      data: {
        title,
        description,
        githubLink,
        liveDemo,
        imageUrl,
        techStack: {
          connect: techStack.map((id) => ({ id })),
        },
      },
    });

    return { errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};

export const getProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      include: { techStack: true },
      orderBy: { createdAt: "desc" },
    });
    return { projects, errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { techStack: true },
    });

    if (!project) throw new Error("Project not found");
    return { project, errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};

export const updateProject = async ({
  id,
  title,
  description,
  githubLink,
  liveDemo,
  imageUrl,
  techStack,
}: UpdateProjectProps) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        githubLink,
        liveDemo,
        imageUrl,
        techStack: techStack
          ? {
              set: [], // Clear old tech
              connect: techStack.map((id) => ({ id })),
            }
          : undefined,
      },
    });

    return { errorMessage: null, project };
  } catch (e) {
    return handleError(e);
  }
};

export const deleteProject = async (id: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("User not found");
    await prisma.project.delete({ where: { id } });
    return { errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};
