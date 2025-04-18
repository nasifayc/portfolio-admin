import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  BrainCircuit,
} from "lucide-react";

export const appbarItems = [
  {
    title: "Overview",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    url: "/project",
    icon: FolderKanban,
  },
  {
    title: "Experience",
    url: "/experience",
    icon: Briefcase,
  },

  {
    title: "Skills",
    url: "/skills",
    icon: BrainCircuit,
  },
];
