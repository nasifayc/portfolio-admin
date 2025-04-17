import { z } from "zod";

export const techStackSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  imageUrl: z.string().url(" Invalid Image URL"),
  tag: z.enum(["frontend", "backend", "mobile", "DevOps", "baas", "saas"]),
});

export const projectSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().min(10, "Description is too short"),
  githubLink: z.string().url("Invalid GitHub URL"),
  liveDemo: z.string().url("Invalid live demo URL"),
  imageUrl: z.string().url("Invalid image URL"),
  techStack: z.array(z.string()).min(1, "Select at least one tech"),
});
