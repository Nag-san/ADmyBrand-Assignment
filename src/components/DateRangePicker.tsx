"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronDown } from "lucide-react";

const ranges = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "This Month", value: "month" },
  { label: "Custom Range", value: "custom" },
];

export function DateRangePicker({
  onChange,
}: {
  onChange?: (value: string) => void;
}) {
  const [selected, setSelected] = useState("30d");

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span className="capitalize">
            {ranges.find((r) => r.value === selected)?.label}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="space-y-1">
          {ranges.map((range) => (
            <button
              key={range.value}
              className={`w-full text-left px-2 py-1 rounded hover:bg-muted transition ${
                selected === range.value ? "bg-muted font-semibold" : ""
              }`}
              onClick={() => handleSelect(range.value)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
