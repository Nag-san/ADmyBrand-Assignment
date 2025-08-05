"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { CardStat } from "@/components/CardStat";
import { DollarSign, Users, TrendingUp, Activity } from "lucide-react";
import { ChartLine } from "@/components/ChartLine";
import { ChartBar } from "@/components/ChartBar";
import { ChartDonut } from "@/components/ChartDonut";
import { ChartFunnel } from "@/components/ChartFunnel";
import { DataTable } from "@/components/DataTable";
import { ExportButtons } from "@/components/ExportButtons";
import { useSegmentFilter } from "@/lib/useSegmentFilter";
import {
  SkeletonCard,
  SkeletonChart,
  SkeletonTable,
} from "@/components/SkeletonLoader";
import {
  revenueData,
  userSourceData,
  conversionData,
  userTableData,
  funnelData,
} from "@/lib/data";
import { userColumns } from "@/components/UserColumns";
import { SortableDashboard } from "@/components/SortableDashboard";
import { InsightsSpotlight } from "@/components/InsightsSpotlight";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 12340,
    users: 4210,
    conversions: 1023,
    growth: 15,
  });
  const { segment } = useSegmentFilter();

  const filteredUserSourceData =
    segment === "All"
      ? userSourceData
      : userSourceData.filter((u) => u.source === segment);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setStats((prev) => ({
          revenue: Math.round(prev.revenue * (1 + (Math.random() - 0.5) / 20)),
          users: Math.round(prev.users * (1 + (Math.random() - 0.5) / 30)),
          conversions: Math.round(
            prev.conversions * (1 + (Math.random() - 0.5) / 25)
          ),
          growth: Math.max(
            0,
            Math.min(100, prev.growth + Math.floor(Math.random() * 5 - 2))
          ),
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [loading]);

  const widgets = [
    {
      id: "chart-line",
      content: <ChartLine data={revenueData} />,
    },
    {
      id: "chart-bar",
      content: <ChartBar data={filteredUserSourceData} />,
    },
    {
      id: "chart-funnel",
      content: <ChartFunnel data={funnelData} />,
    },
    {
      id: "chart-donut",
      content: <ChartDonut data={conversionData} />,
    },
    {
      id: "insights",
      content: <InsightsSpotlight />,
    },
  ];

  return (
    <DashboardLayout>
      {/* Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading
          ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          : [
              <CardStat
                key="stat1"
                title="Revenue"
                value={`$${stats.revenue.toLocaleString()}`}
                icon={<DollarSign className="h-4 w-4" />}
                trend={{ direction: "up", percent: 12.4 }}
              />,
              <CardStat
                key="stat2"
                title="Users"
                value={stats.users.toLocaleString()}
                icon={<Users className="h-4 w-4" />}
                trend={{ direction: "down", percent: 3.1 }}
              />,
              <CardStat
                key="stat3"
                title="Conversions"
                value={stats.conversions.toLocaleString()}
                icon={<TrendingUp className="h-4 w-4" />}
                trend={{ direction: "up", percent: 8.9 }}
              />,
              <CardStat
                key="stat4"
                title="Growth"
                value={`${stats.growth}%`}
                icon={<Activity className="h-4 w-4" />}
              />,
            ]}
      </section>

      {/* Draggable Charts */}
      <section className="pt-8">
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonChart key={i} />
            ))}
          </div>
        ) : (
          <SortableDashboard widgets={widgets} />
        )}
      </section>

      {/* Data Table */}
      <section className="pt-8 space-y-4">
        {loading ? (
          <SkeletonTable />
        ) : (
          <>
            <ExportButtons targetId="export-table" csvData={userTableData} />
            <DataTable columns={userColumns} data={userTableData} />
          </>
        )}
      </section>
    </DashboardLayout>
  );
}
