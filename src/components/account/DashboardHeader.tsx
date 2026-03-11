"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ThemeToggler } from "../shared/ThemeToggler";
import Link from "next/link";
import Logo from "../shared/Logo";
import { config } from "@/utils/config";
import { SunIcon, MoonIcon, Calendar, Menu, Bell, BookOpen, LayoutDashboard, SettingsIcon, LogOutIcon } from "lucide-react";
import { WiSunrise } from "react-icons/wi";
import { useSidebarStore } from "@/stores/sidebar.store";
import { useAuthStore } from "@/stores/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toggle, isOpen } = useSidebarStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const { greeting, greetingIcon, formattedDate, formattedTime } = useMemo(() => {
    const currentHour = currentTime.getHours();
    let greeting: string;
    let greetingIcon: React.ReactNode;

    if (currentHour < 12) {
      greeting = "morning";
      greetingIcon = <WiSunrise size={20} className="text-amber-500" />;
    } else if (currentHour < 17) {
      greeting = "afternoon";
      greetingIcon = <SunIcon size={18} className="text-amber-500" />;
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

    return { greeting, greetingIcon, formattedDate, formattedTime };
  }, [currentTime]);

  const userName = `${user?.firstName} ${user?.lastName}`;

  const getUserInitials = () => {
    if (!userName.trim()) return "U";
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Mock notifications for LMS
  const notifications = [
    { id: 1, title: "New course available", message: "Advanced React Patterns", time: "2h ago" },
    { id: 2, title: "Assignment due", message: "JavaScript Fundamentals - Due tomorrow", time: "5h ago" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <Menu size={24} className="text-slate-700 dark:text-slate-200" />
            </button>

            <Link href="/" className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Logo className="h-8 w-8" />
              <div className="hidden sm:flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-tight">
                  {config.SITE_NAME}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {config.BRANCH_NAME}
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop Greeting */}
            <div className="hidden lg:flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              {greetingIcon}
              <span>
                Good {greeting},{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {user?.firstName}
                </span>
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <Calendar size={16} />
              <span>{formattedDate}</span>
              <span className="text-slate-400">{formattedTime}</span>
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

            <ThemeToggler />

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Bell size={20} className="text-slate-600 dark:text-slate-400" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notif) => (
                  <DropdownMenuItem key={notif.id} className="flex flex-col items-start py-3 cursor-pointer">
                    <span className="font-medium text-sm">{notif.title}</span>
                    <span className="text-xs text-slate-500">{notif.message}</span>
                    <span className="text-xs text-slate-400 mt-1">{notif.time}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 focus:outline-none">
                  <Avatar className="h-9 w-9 border-2 border-primary/20 hover:border-primary transition-colors">
                    <AvatarImage src={user?.avatar?.url || ""} alt={`${userName}'s avatar`} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    <LayoutDashboard size={16} className="mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/my-courses" className="cursor-pointer">
                    <BookOpen size={16} className="mr-2" />
                    My Courses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/settings" className="cursor-pointer">
                    <SettingsIcon size={16} className="mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
                  <LogOutIcon size={16} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;