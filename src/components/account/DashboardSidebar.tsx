"use client";
import {
  GraduationCap,
  LayoutDashboard,
  LogOutIcon,
  PlayCircle,
  SettingsIcon,
  Menu,
  X,
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

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const DashboardSidebar = () => {
  // Render mobile sidebar on mobile, desktop sidebar on desktop
  return (
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>

      {/* Mobile Sidebar - hidden on desktop */}
      <div className="lg:hidden">
        <MobileSidebar />
      </div>
    </>
  );
};

// Desktop Sidebar Component
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
    },
    {
      label: "Saved Sermons",
      href: "/account/sermons",
      icon: <PlayCircle size={20} />,
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
    <div className="space-y-6 ">
      <UserInfo />

      <nav className="bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-4">
        <ul className="space-y-1">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/30 hover:text-primary transition-colors font-medium",
                  isItemActive(item.href) &&
                    "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light font-semibold hover:bg-primary/10 dark:hover:bg-primary/20"
                )}
                href={item.href}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-colors text-sm font-medium group cursor-pointer"
            onClick={() => logout()}
            disabled={isPending}
          >
            <LogOutIcon size={20} className="group-hover:text-red-500" />
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
};

// Mobile Sidebar Component
const MobileSidebar = () => {
  const pathname = usePathname();
  const { isOpen, close } = useSidebarStore();
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
    },
    {
      label: "Saved Sermons",
      href: "/account/sermons",
      icon: <PlayCircle size={20} />,
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
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 backdrop-blur-xs backdrop-saturate-150",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={close}
      />

      {/* Mobile Sidebar Container */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out w-80",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full space-y-6 p-6 bg-white dark:bg-slate-900 overflow-y-auto">
          {/* Mobile Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Logo className="h-8" />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-3">
                  {config.SITE_NAME}
                </span>
                <span className="text-xs font-medium">
                  {config.BRANCH_NAME}
                </span>
              </div>
            </div>
            <button
              onClick={close}
              className="p-2 rounded-lg cursor-pointer absolute top-3 right-3"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <UserInfo />

          <nav className="bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-4">
            <ul className="space-y-1">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/30 hover:text-primary transition-colors font-medium",
                      isItemActive(item.href) &&
                        "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light font-semibold hover:bg-primary/10 dark:hover:bg-primary/20"
                    )}
                    href={item.href}
                    onClick={close}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-colors text-sm font-medium group cursor-pointer"
                onClick={() => logout()}
                disabled={isPending}
              >
                <LogOutIcon size={20} className="group-hover:text-red-500" />
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
