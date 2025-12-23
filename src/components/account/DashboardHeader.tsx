"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ThemeToggler } from "../shared/ThemeToggler";
import Link from "next/link";
import Logo from "../shared/Logo";
import { config } from "@/utils/config";
import { SunIcon, MoonIcon, Calendar, Menu } from "lucide-react";
import { WiSunrise } from "react-icons/wi";
import { useSidebarStore } from "@/stores/sidebar.store";
import { useAuthStore } from "@/stores/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const DashboardHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toggle, isOpen } = useSidebarStore();
  const { user, hasHydrated } = useAuthStore();

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

  const userName = `${user?.firstName} ${user?.lastName}`;

  const getUserInitials = () => {
    if (!userName) return "U";
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button
              onClick={toggle}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <Menu size={24} />
            </button>

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
                  Good {greeting}, <span className="font-medium">{user?.firstName}</span>
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
              <Avatar className="h-9 w-9 border-2 border-accent-warm-2 hover:border-accent-warm-2 transition-colors">
                <AvatarImage
                  src={user?.avatar?.url || ""}
                  alt={`${userName}'s avatar`}
                />
                <AvatarFallback className="border-accent-warm-2 text-accent-warm-2 font-semibold bg-accent-warm">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
