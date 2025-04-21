import { getDashboardStats, getWeeklyStats } from "@/actions/overview";
import DashboardLoading from "@/components/shared/loading/SkeletonLoading";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const Overview = dynamic(() => import("@/components/admin/Overview"), {
  loading: () => <Loader2 className="animate-spin" />,
  ssr: true,
});

const WeeklyStatsChart = dynamic(
  () => import("@/components/admin/WeeklyStatsChart"),
  {
    loading: () => <Loader2 className="animate-spin" />,
    ssr: true,
  },
);

const GeneralPieChart = dynamic(
  () => import("@/components/admin/GeneralPieChart"),
  {
    loading: () => <Loader2 className="animate-spin" />,
    ssr: true,
  },
);

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
      <Overview stats={stats} />
      <div className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-xl font-medium">Analytics</h3>
        <div className="flex flex-wrap items-start gap-4">
          <WeeklyStatsChart data={weeklyStats} />
          <GeneralPieChart count={count} />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
