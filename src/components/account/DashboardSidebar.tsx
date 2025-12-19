"use client";
import {
  GraduationCap,
  LayoutDashboard,
  LogOutIcon,
  PlayCircle,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import UserInfo from "./overview/UserInfo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const DashboardSidebar = () => {
  const pathname = usePathname();

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
      label: "Sermons & Media",
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
    <div className="space-y-6">
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
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-colors text-sm font-medium group cursor-pointer">
            <LogOutIcon size={20} className="group-hover:text-red-500" />
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
