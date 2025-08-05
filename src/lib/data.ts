export const revenueData = [
  { date: "Jan", revenue: 1200 },
  { date: "Feb", revenue: 2100 },
  { date: "Mar", revenue: 3200 },
  { date: "Apr", revenue: 2800 },
  { date: "May", revenue: 3500 },
  { date: "Jun", revenue: 4300 },
  { date: "Jul", revenue: 3900 },
  { date: "Aug", revenue: 4700 },
];

export const userSourceData = [
  { source: "Organic", users: 1200 },
  { source: "Paid Ads", users: 800 },
  { source: "Referral", users: 600 },
  { source: "Social Media", users: 1100 },
  { source: "Email", users: 400 },
];

export const conversionData = [
  { label: "Email", value: 400 },
  { label: "Social Media", value: 300 },
  { label: "Search", value: 200 },
  { label: "Referral", value: 100 },
  { label: "Direct", value: 150 },
];

export type UserRow = {
  name: string;
  email: string;
  role: string;
  signUpDate: string;
};

export const userTableData: UserRow[] = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    signUpDate: "2023-01-10",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    signUpDate: "2023-02-15",
  },
  {
    name: "Charlie Ray",
    email: "charlie@example.com",
    role: "User",
    signUpDate: "2023-03-20",
  },
  {
    name: "Daisy Lee",
    email: "daisy@example.com",
    role: "Editor",
    signUpDate: "2023-04-22",
  },
  {
    name: "Evan Stone",
    email: "evan@example.com",
    role: "User",
    signUpDate: "2023-05-05",
  },
];

export const funnelData = [
  { stage: "Visitors", count: 5000 },
  { stage: "Signups", count: 1800 },
  { stage: "Trials", count: 800 },
  { stage: "Conversions", count: 350 },
];
