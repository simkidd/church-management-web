"use client";
import {
  GraduationCap,
  LayoutDashboard,
  LogOutIcon,
  PlayCircle,
  SettingsIcon,
  Menu,
  X,
  BookOpen,
  Trophy,
  Clock,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import UserInfo from "./overview/UserInfo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSidebarStore } from "@/stores/sidebar.store";
import Logo from "../shared/Logo";
import { config } from "@/utils/config";
import { useLogout } from "@/hooks/use-logout";
import { Progress } from "@/components/ui/progress";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const DashboardSidebar = () => {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>
      <div className="lg:hidden">
        <MobileSidebar />
      </div>
    </>
  );
};

// LMS Stats Component
const LearningStats = () => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 rounded-2xl p-4 border border-primary/10">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
        <TrendingUp size={16} className="text-primary" />
        Learning Progress
      </h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 dark:text-slate-400">Courses Completed</span>
            <span className="font-medium text-slate-900 dark:text-white">3/5</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 dark:text-slate-400">Hours Learned</span>
            <span className="font-medium text-slate-900 dark:text-white">24h</span>
          </div>
          <Progress value={40} className="h-2" />
        </div>
      </div>
    </div>
  );
};

// Desktop Sidebar
const DesktopSidebar = () => {
  const pathname = usePathname();
  const { mutate: logout, isPending } = useLogout();

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/account",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "My Courses",
      href: "/account/my-courses",
      icon: <GraduationCap size={20} />,
      badge: "3",
    },
    {
      label: "Saved Sermons",
      href: "/account/sermons",
      icon: <PlayCircle size={20} />,
    },
    {
      label: "Achievements",
      href: "/account/achievements",
      icon: <Trophy size={20} />,
    },
    {
      label: "Study Schedule",
      href: "/account/schedule",
      icon: <Clock size={20} />,
    },
    {
      label: "Account Settings",
      href: "/account/settings",
      icon: <SettingsIcon size={20} />,
    },
  ];

  const isItemActive = (itemUrl: string) => {
    if (itemUrl === "/account") {
      return pathname === "/account";
    }
    return pathname.startsWith(`${itemUrl}/`) || pathname === itemUrl;
  };

  return (
    <div className="space-y-6 sticky top-24">
      <UserInfo />

      <LearningStats />

      <nav className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-3">
        <ul className="space-y-1">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-primary transition-all font-medium group",
                  isItemActive(item.href) &&
                    "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-semibold"
                )}
                href={item.href}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "transition-colors",
                    isItemActive(item.href) ? "text-primary" : "text-slate-400 group-hover:text-primary"
                  )}>
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors text-sm font-medium group"
            onClick={() => logout()}
            disabled={isPending}
          >
            <LogOutIcon size={20} className="group-hover:text-red-500 transition-colors" />
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
};

// Mobile Sidebar
const MobileSidebar = () => {
  const pathname = usePathname();
  const { isOpen, close } = useSidebarStore();
  const { mutate: logout, isPending } = useLogout();

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/account", icon: <LayoutDashboard size={20} /> },
    { label: "My Courses", href: "/account/my-courses", icon: <GraduationCap size={20} />, badge: "3" },
    { label: "Saved Sermons", href: "/account/sermons", icon: <PlayCircle size={20} /> },
    { label: "Achievements", href: "/account/achievements", icon: <Trophy size={20} /> },
    { label: "Schedule", href: "/account/schedule", icon: <Clock size={20} /> },
    { label: "Settings", href: "/account/settings", icon: <SettingsIcon size={20} /> },
  ];

  const isItemActive = (itemUrl: string) => {
    if (itemUrl === "/account") return pathname === "/account";
    return pathname.startsWith(`${itemUrl}/`) || pathname === itemUrl;
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 backdrop-blur-sm",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={close}
      />

      <div
        className={cn(
          "fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-out w-80",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col bg-white dark:bg-slate-900 overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" onClick={close}>
              <Logo className="h-8 w-8" />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-tight text-slate-900 dark:text-white">
                  {config.SITE_NAME}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {config.BRANCH_NAME}
                </span>
              </div>
            </Link>
            <button
              onClick={close}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} className="text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          <div className="flex-1 p-6 space-y-6">
            <UserInfo />
            
            <LearningStats />

            <nav className="space-y-1">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all font-medium",
                    isItemActive(item.href) &&
                      "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-semibold"
                  )}
                  href={item.href}
                  onClick={close}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-100 dark:border-slate-800">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors font-medium"
              onClick={() => logout()}
              disabled={isPending}
            >
              <LogOutIcon size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;