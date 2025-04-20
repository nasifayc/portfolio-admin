"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

// Dynamically import ApexChart to avoid SSR issues
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type WeeklyStats = {
  date: string;
  projects: number;
  techStacks: number;
  experiences: number;
};

interface WeeklyStatsChartProps {
  data: WeeklyStats[];
}

function WeeklyStatsChart({ data }: WeeklyStatsChartProps) {
  const categories = data.map((item) => item.date);

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 300,
      stacked: false,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
    },
    yaxis: {
      title: {
        text: "Count",
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: "top",
    },
    colors: ["#8884d8", "#82ca9d", "#ffc658"],
  };

  const series = [
    {
      name: "Projects",
      data: data.map((item) => item.projects),
    },
    {
      name: "Tech Stacks",
      data: data.map((item) => item.techStacks),
    },
    {
      name: "Experiences",
      data: data.map((item) => item.experiences),
    },
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="mb-4 text-xl font-semibold">📊 Weekly Activity</h2>
        <ApexChart
          options={chartOptions}
          series={series}
          type="bar"
          height={300}
        />
      </CardContent>
    </Card>
  );
}

export default WeeklyStatsChart;
