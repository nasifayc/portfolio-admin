"use client";

import {
  Activity,
  BrainCircuit,
  Eye,
  FolderArchive,
  Loader2,
  Timer,
} from "lucide-react";

import { Card, CardContent } from "../ui/card";
import dynamic from "next/dynamic";
import { ElementType } from "react";

const CarouselSection = dynamic(() => import("../admin/Carousel"), {
  loading: () => <Loader2 className="animate-spin" size={30} />,
  ssr: false,
});

type Props = {
  stats: {
    totalProjects: number | null;
    totalTechStacks: number | null;
    totalVisits: number | null;
    projectsByTag: Record<string, number> | null;
    currentRoles: number | null;
    totalExperienceMonths: number | null;
  };
};

type OverviewCardProps = {
  icon: ElementType;
  iconColor: string;
  title: string;
  subTitle: string;
  value: number | null;
};

function Overview({ stats }: Props) {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-xl font-medium">Overview</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <OverviewCard
            icon={FolderArchive}
            iconColor="text-blue-600"
            title="Total Projects"
            subTitle="Projects"
            value={stats.totalProjects}
          />

          <OverviewCard
            icon={BrainCircuit}
            iconColor="text-purple-600"
            title="Tech Stacks"
            subTitle="Frameworks"
            value={stats.totalTechStacks}
          />

          <OverviewCard
            icon={Timer}
            iconColor="text-orange-600"
            title=" Experience"
            subTitle="Month"
            value={stats.totalExperienceMonths}
          />

          <OverviewCard
            icon={Activity}
            iconColor="text-green-600"
            title="Activity"
            subTitle="Currently working"
            value={stats.currentRoles}
          />

          <OverviewCard
            icon={Eye}
            iconColor="text-cyan-600"
            title="View"
            subTitle="Portfolio views"
            value={stats.totalVisits}
          />
        </div>
      </div>
      {stats.projectsByTag && (
        <CarouselSection projectsByTag={stats.projectsByTag} />
      )}
    </div>
  );
}

function OverviewCard({
  icon: Icon,
  title,
  subTitle,
  iconColor,
  value,
}: OverviewCardProps) {
  return (
    <Card className="rounded-xs p-0">
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <div className="bg-muted inline-block rounded-sm p-2">
            <Icon className={`${iconColor}`} size={30} />
          </div>
          <h3 className="font-semibold lg:text-xl xl:text-xl">{title}</h3>
        </div>
        <h1 className="text-muted-foreground">{subTitle}</h1>
        <p className="text-2xl font-extrabold">{value} </p>
      </CardContent>
    </Card>
  );
}

export default Overview;
