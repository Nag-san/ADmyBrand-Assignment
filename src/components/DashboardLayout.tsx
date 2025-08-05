"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useState } from "react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { ThemeToggle } from "@/components/ThemeToggle"; // ✅ Make sure you import your custom toggle
import { Menu, LineChart, Settings, LogOut, BarChartBig } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-100 font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-6 shadow-inner rounded-tr-3xl">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-4 lg:hidden">
            <Menu className="h-6 w-6 text-slate-100" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 p-4 bg-[#1e293b] text-slate-100"
        >
          <SheetHeader>
            <SheetTitle className="text-xl font-bold tracking-tight">
              Menu
            </SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <motion.header
          className="flex items-center justify-between border-b border-white/10 p-6 bg-white/10 backdrop-blur-md sticky top-0 z-10 shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-4">
            {/* Hamburger Button (mobile only) */}
            <button
              className="lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-slate-100" />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-100">
                ADmyBRAND Insights
              </h1>
              <p className="text-sm text-slate-300">
                AI-powered marketing analytics dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <DateRangePicker />
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 p-6 space-y-8 bg-transparent">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent() {
  return (
    <div className="flex flex-col h-full">
      <div className="text-3xl font-extrabold tracking-tight mb-6 text-slate-100">
        ADmyBRAND
      </div>
      <nav className="space-y-4">
        <Link
          href="#"
          className="flex items-center gap-3 text-slate-300 hover:text-white transition text-base"
        >
          <LineChart className="h-5 w-5" /> Dashboard
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 text-slate-300 hover:text-white transition text-base"
        >
          <BarChartBig className="h-5 w-5" /> Reports
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 text-slate-300 hover:text-white transition text-base"
        >
          <Settings className="h-5 w-5" /> Settings
        </Link>
      </nav>
      <div className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-500 cursor-pointer pt-6 text-base">
        <LogOut className="h-5 w-5" /> Logout
      </div>
    </div>
  );
}
