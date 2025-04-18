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

export const experienceSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyImage: z.string().url("Company image must be a valid URL"),
  startingDate: z.coerce.date({
    required_error: "Start date is required",
    invalid_type_error: "Invalid date format",
  }),
  endDate: z.coerce.date().optional(),
  stillWorking: z.boolean(),
  description: z.string().min(1, "Description is required"),
  role: z.array(z.string().min(1, "Role cannot be empty")),
});
