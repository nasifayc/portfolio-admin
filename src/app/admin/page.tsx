import { getDashboardStats, getWeeklyStats } from "@/actions/overview";
import GeneralPieChart from "@/components/admin/GeneralPieChart";
import Overview from "@/components/admin/Overview";
import WeeklyStatsChart from "@/components/admin/WeeklyStatsChart";

async function AdminPage() {
  const stats = await getDashboardStats();
  const count = {
    totalProjects: stats.totalProjects,
    totalTechStacks: stats.totalTechStacks,
    totalExp: stats.totalExp,
  };
  const weeklyStats = await getWeeklyStats();
  if (stats.errorMessage) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-3xl font-bold">{stats.errorMessage}</p>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col gap-16">
      <div className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-xl font-medium">Analytics</h3>
        <div className="flex flex-wrap items-start gap-4">
          <WeeklyStatsChart data={weeklyStats} />
          <GeneralPieChart count={count} />
        </div>
      </div>

      <Overview stats={stats} />
    </div>
  );
}

export default AdminPage;
