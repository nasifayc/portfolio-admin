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

export interface Project {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  liveDemo: string;
  imageUrl: string;
  techStack: string[];
  createdAt?: string;
  updatedAt?: string;
}
