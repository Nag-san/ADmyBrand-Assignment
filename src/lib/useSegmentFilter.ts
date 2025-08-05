import { create } from "zustand";

type Segment =
  | "All"
  | "Organic"
  | "Paid Ads"
  | "Referral"
  | "Social Media"
  | "Email";

interface SegmentFilterStore {
  segment: Segment;
  setSegment: (value: Segment) => void;
}

export const useSegmentFilter = create<SegmentFilterStore>((set) => ({
  segment: "All",
  setSegment: (value) => set({ segment: value }),
}));
