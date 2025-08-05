"use client";

import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface FunnelData {
  stage: string;
  count: number;
}

interface ChartFunnelProps {
  data: FunnelData[];
}

export function ChartFunnel({ data }: ChartFunnelProps) {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-md border border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-lg font-semibold text-slate-100 mb-4">
        Conversion Funnel
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", color: "#fff" }}
            />
            <Funnel dataKey="count" data={data} isAnimationActive>
              <LabelList
                dataKey="stage"
                position="right"
                fill="#cbd5e1"
                stroke="none"
                style={{ fontSize: 14 }}
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
