"use client";
import { Card, CardContent } from "../ui/card";

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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <Card className="rounded-sm">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">Total Projects</h3>
          <p className="text-2xl">{stats.totalProjects}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">Tech Stacks</h3>
          <p className="text-2xl">{stats.totalTechStacks}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">Experience (months)</h3>
          <p className="text-2xl">{stats.totalExperienceMonths}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">Currently Working Roles</h3>
          <p className="text-2xl">{stats.currentRoles}</p>
        </CardContent>
      </Card>

      {stats.projectsByTag &&
        Object.entries(stats.projectsByTag).map(([tag, count]) => (
          <Card key={tag}>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold capitalize">
                {tag} Projects
              </h3>
              <p className="text-2xl">{count}</p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

export default Overview;
