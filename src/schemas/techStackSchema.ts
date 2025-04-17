import { z } from "zod";

export const techStackSchema = z.object({
  name: z.string().min(2),
  imageUrl: z.string().url(),
  tag: z.enum(["frontend", "backend", "mobile", "DevOps", "baas", "saas"]),
});
