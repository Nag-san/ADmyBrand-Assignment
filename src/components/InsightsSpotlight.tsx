"use client";

import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const fakeInsights = [
  "🧠 Campaign A is outperforming B by 18% this week.",
  "🚀 Consider increasing ad spend on Instagram – 24% higher ROI.",
  "📉 Bounce rate increased by 7% on mobile — optimize landing pages.",
  "🕐 Best performing ad time is 8 PM to 10 PM — schedule accordingly.",
  "🔍 42% of your traffic is from organic search — leverage more SEO.",
];

export function InsightsSpotlight() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % fakeInsights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-full min-h-[150px] dark:bg-[#101828]">
      <CardContent className="p-4 flex items-start gap-3">
        <Lightbulb className="text-yellow-400 mt-1" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground uppercase">
            Insights Spotlight
          </p>
          <p className="text-lg text-foreground font-semibold leading-snug">
            {fakeInsights[current]}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
