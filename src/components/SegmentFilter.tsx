"use client";

import { useSegmentFilter } from "@/lib/useSegmentFilter";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function SegmentFilter() {
  const { segment, setSegment } = useSegmentFilter();

  return (
    <Select value={segment} onValueChange={(v) => setSegment(v as any)}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select segment" />
      </SelectTrigger>
      <SelectContent>
        {[
          "All",
          "Organic",
          "Paid Ads",
          "Referral",
          "Social Media",
          "Email",
        ].map((seg) => (
          <SelectItem key={seg} value={seg}>
            {seg}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
