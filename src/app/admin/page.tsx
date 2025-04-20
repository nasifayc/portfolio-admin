import { getDashboardStats, getWeeklyStats } from "@/actions/overview";
import Overview from "@/components/admin/Overview";
import WeeklyStatsChart from "@/components/admin/WeeklyStatsChart";

async function AdminPage() {
  const stats = await getDashboardStats();
  const weeklyStats = await getWeeklyStats();
  if (stats.errorMessage) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-3xl font-bold">{stats.errorMessage}</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <Overview stats={stats} />
      <WeeklyStatsChart data={weeklyStats} />
    </div>
  );
}

export default AdminPage;
