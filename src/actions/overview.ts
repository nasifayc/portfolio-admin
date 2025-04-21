"use server";

import { prisma } from "@/db/prisma";

export const getDashboardStats = async () => {
  try {
    const totalProjects = await prisma.project.count();
    const totalTechStacks = await prisma.techStack.count();
    const totalExp = await prisma.experience.count();
    const totalVisits = await prisma.visit.count();
    // const totalVisitsToday = await prisma.visit.count({
    //   where: {
    //     createdAt: {
    //       gte: new Date(new Date().setHours(0, 0, 0, 0)),
    //     },
    //   },
    // });

    const projectsByTagRaw = await prisma.techStack.findMany({
      select: {
        tag: true,
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });

    const projectsByTag = projectsByTagRaw.reduce(
      (acc, curr) => {
        if (!acc[curr.tag]) {
          acc[curr.tag] = 0;
        }
        acc[curr.tag] += curr._count.projects;
        return acc;
      },
      {} as Record<string, number>,
    );

    const experience = await prisma.experience.findMany();

    const currentRoles = experience.filter((e) => e.stillWorking).length;

    const totalExperienceMonths = experience.reduce((acc, exp) => {
      const start = new Date(exp.startingDate);
      const end = exp.stillWorking ? new Date() : new Date(exp.endDate!);
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      return acc + months;
    }, 0);

    return {
      errorMessage: null,
      totalProjects,
      totalTechStacks,
      totalExp,
      totalVisits,
      projectsByTag,
      currentRoles,
      totalExperienceMonths,
    };
  } catch (e) {
    console.error(e);
    return {
      errorMessage: "Error fetching dashboard stats",
      totalProjects: null,
      totalTechStacks: null,
      totalExp: null,
      totalVisits: null,
      projectsByTag: null,
      currentRoles: null,
      totalExperienceMonths: null,
    };
  }
};

const getLast7Days = () => {
  const today = new Date();
  return Array.from({ length: 7 })
    .map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      d.setHours(0, 0, 0, 0);
      return d;
    })
    .reverse();
};

export const getWeeklyStats = async () => {
  const days = getLast7Days();

  const projects = await prisma.project.findMany({
    where: {
      createdAt: {
        gte: days[0],
      },
    },
  });

  const techStacks = await prisma.techStack.findMany({
    where: {
      createdAt: {
        gte: days[0],
      },
    },
  });

  const experiences = await prisma.experience.findMany({
    where: {
      createdAt: {
        gte: days[0],
      },
    },
  });

  const dailyStats = days.map((day) => {
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const format = (d: Date) => d.toISOString().split("T")[0];

    return {
      date: format(day),
      projects: projects.filter(
        (p) => p.createdAt >= day && p.createdAt < nextDay,
      ).length,
      techStacks: techStacks.filter(
        (ts) => ts.createdAt >= day && ts.createdAt < nextDay,
      ).length,
      experiences: experiences.filter(
        (e) => e.createdAt >= day && e.createdAt < nextDay,
      ).length,
    };
  });

  return dailyStats;
};
