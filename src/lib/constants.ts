import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  BrainCircuit,
  Eye,
} from "lucide-react";

export const generalAppbarItems = [
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

export const analyticsAppbarItems = [
  {
    title: "Visit History",
    url: "/visit",
    icon: Eye,
  },
];
