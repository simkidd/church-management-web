"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ThemeToggler } from "../shared/ThemeToggler";
import Link from "next/link";
import Logo from "../shared/Logo";
import { config } from "@/utils/config";
import { SunIcon, MoonIcon, Calendar } from "lucide-react";
import { WiSunrise } from "react-icons/wi";

const DashboardHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute (instead of every second for better performance)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const { greeting, greetingIcon, formattedDate, formattedTime } =
    useMemo(() => {
      const currentHour = currentTime.getHours();
      let greeting: string;
      let greetingIcon: React.ReactNode;

      if (currentHour < 12) {
        greeting = "morning";
        greetingIcon = <WiSunrise size={20} className="text-amber-500" />;
      } else if (currentHour < 17) {
        greeting = "afternoon";
        greetingIcon = <SunIcon size={18} className="text-amber-400" />;
      } else {
        greeting = "evening";
        greetingIcon = <MoonIcon size={18} className="text-indigo-400" />;
      }

      const formattedDate = currentTime.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return {
        greeting,
        greetingIcon,
        formattedDate,
        formattedTime,
      };
    }, [currentTime]);

  return (
    <header className="sticky top-0 z-50 bg-card-light/90 dark:bg-card-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-900 dark:text-white "
            >
              <Logo className="h-8" />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-3">
                  {config.SITE_NAME}
                </span>
                <span className="text-xs font-medium">
                  {config.BRANCH_NAME}
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* Date/Time Info - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-4 text-sm border-r border-slate-200 dark:border-slate-700 pr-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-500">
                {greetingIcon}
                <span>
                  Good {greeting}, <span className="font-medium">Sarah</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-500">
                <Calendar
                  size={16}
                  className="text-slate-600 dark:text-slate-500"
                />
                <span>{formattedDate}</span>
                <span className="mx-1">•</span>
                <span>{formattedTime}</span>
              </div>
            </div>

            <ThemeToggler />
            <div className="relative">
              <div
                className="size-9 rounded-full bg-cover bg-center cursor-pointer ring-2 ring-primary/20 hover:ring-primary/50 transition-all"
                data-alt="User profile picture thumbnail"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2-8xQn93rs82BYV8YyFnryxIMerQ1vril_kTHQTolaDsfBKyzyJiItlXocc-hbqEAeh5Tp1tCPQyfoZVL0w2yDsKFugRJyIAf_vEbgqYwnqx2nWxB-yPQlrJpHJT6gYLskc-yoB0dslSqQzCjzEFtLZdqxMKpKh5aJloN1qOt3NvY90uB91Zrz4E1wAEDW-Pzyr3k0GgkBd0zSoS456-n-3XZXzjRv9LtKTKd1QoQ6-IJw9x_JshzT9jBJtIqjFkXZdeyqb_4OKDN')                ",
                }}
              ></div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-card-dark rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
