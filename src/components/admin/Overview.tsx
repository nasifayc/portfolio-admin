"use client";
import { Activity, BrainCircuit, FolderArchive, Timer } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import dynamic from "next/dynamic";

const CarouselSection = dynamic(() => import("../admin/Carousel"), {
  loading: () => <p>Loading</p>,
  ssr: false,
});

type Props = {
  stats: {
    totalProjects: number | null;
    totalTechStacks: number | null;
    projectsByTag: Record<string, number> | null;
    currentRoles: number | null;
    totalExperienceMonths: number | null;
  };
};

function Overview({ stats }: Props) {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-xl font-medium">Overview</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Card className="rounded-xs p-0">
            <CardContent className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <div className="bg-muted inline-block rounded-sm p-2">
                  <FolderArchive className="text-green-700" size={30} />
                </div>
                <h3 className="text-xl font-semibold">Total Projects</h3>
              </div>
              <h1 className="text-muted-foreground">Projects</h1>
              <p className="text-2xl font-extrabold">{stats.totalProjects} </p>
            </CardContent>
          </Card>

          <Card className="rounded-xs p-0">
            <CardContent className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <div className="bg-muted inline-block rounded-sm p-2">
                  <BrainCircuit className="text-amber-300" size={30} />
                </div>
                <h3 className="text-xl font-semibold">Tech Stacks</h3>
              </div>
              <h1 className="text-muted-foreground">Frameworks</h1>
              <p className="text-2xl font-extrabold">{stats.totalTechStacks}</p>
            </CardContent>
          </Card>

          <Card className="rounded-xs p-0">
            <CardContent className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <div className="bg-muted inline-block rounded-sm p-2">
                  <Timer className="text-amber-600" size={30} />
                </div>
                <h3 className="text-xl font-semibold wrap-break-word">
                  Experience
                </h3>
              </div>
              <h1 className="text-muted-foreground">Month</h1>
              <p className="text-2xl font-extrabold">
                {stats.totalExperienceMonths}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xs p-0">
            <CardContent className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <div className="bg-muted inline-block rounded-sm p-2">
                  <Activity className="text-blue-600" size={30} />
                </div>
                <h3 className="text-xl font-semibold">Activity </h3>
              </div>
              <h1 className="text-muted-foreground">Currently working </h1>
              <p className="text-2xl font-extrabold">{stats.currentRoles}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      {stats.projectsByTag && (
        <CarouselSection projectsByTag={stats.projectsByTag} />
      )}
      {/* <div className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-2xl font-medium">Category</h3>
        <Carousel className="w-4/6 self-center">
          <CarouselContent>
            {stats.projectsByTag &&
              Object.entries(stats.projectsByTag).map(([tag, count]) => (
                <CarouselItem
                  key={tag}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card className="h-40 rounded-sm p-0">
                    <CardContent className="flex flex-col items-start gap-4 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="bg-muted text-muted-foreground inline-block rounded-sm p-2">
                          {tag === "mobile" ? (
                            <Phone size={20} />
                          ) : tag === "frontend" ? (
                            <Computer size={20} />
                          ) : tag === "backend" ? (
                            <Database size={20} />
                          ) : (
                            <FolderCheck size={20} />
                          )}
                        </div>

                        <h3 className="text-muted-foreground text-lg capitalize">
                          {tag} Projects
                        </h3>
                      </div>

                      <p className="self-center text-2xl font-extrabold">
                        {count}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div> */}
    </div>
  );
}

export default Overview;
