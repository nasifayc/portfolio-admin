"use client";

import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  count: {
    totalProjects: number | null;
    totalTechStacks: number | null;
    totalExp: number | null;
  };
};

function GeneralPieChart({ count }: Props) {
  const labels = ["Projects", "Tech Stacks", "Experiences"];
  const series = [
    count.totalProjects ?? 0,
    count.totalTechStacks ?? 0,
    count.totalExp ?? 0,
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "pie",
    },
    labels,
    legend: {
      position: "bottom",
    },
  };
  return (
    <Card className="basis-full rounded-sm md:basis-1/5 lg:basis-1/6 xl:basis-1/6">
      <CardHeader>
        <CardTitle className="text-xl">General Statistics</CardTitle>
        <CardDescription>Current status</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart options={options} series={series} type="pie" width="100%" />
      </CardContent>
    </Card>
  );
}

export default GeneralPieChart;
