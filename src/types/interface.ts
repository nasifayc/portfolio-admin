export type Tag =
  | "frontend"
  | "backend"
  | "mobile"
  | "DevOps"
  | "baas"
  | "saas";

export interface TechStack {
  id: string;
  name: string;
  imageUrl: string;
  tag: Tag;
  createdAt?: string;
  updatedAt?: string;
}
