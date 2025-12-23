"use client";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar.store";
import {
  GraduationCap,
  Home,
  List,
  PlayCircle,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileTabbar = () => {
  const pathname = usePathname();
  const { open } = useSidebarStore();

  const tabs = [
    {
      label: "Dashboard",
      href: "/account",
      icon: Home,
      active: pathname === "/account",
    },
    {
      label: "Courses",
      href: "/account/my-courses",
      icon: GraduationCap,
      active: pathname.startsWith("/account/my-courses"),
    },
    {
      label: "Media",
      href: "/account/sermons",
      icon: PlayCircle,
      active: pathname.startsWith("/account/sermons"),
    },
    {
      label: "Account",
      href: "/account/settings",
      icon: User,
      active: pathname.startsWith("/account/settings"),
    },
    {
      label: "Menu",
      href: "#",
      icon: List,
      isMenu: true,
    },
  ];

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    open(); // Use Zustand store to open sidebar
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 shadow-lg safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          
          if (tab.isMenu) {
            return (
              <button
                key={tab.label}
                onClick={handleMenuClick}
                className="flex flex-col items-center justify-center w-16 h-full p-2 group cursor-pointer active:scale-95 transition-transform"
                aria-label="Open menu"
              >
                <div className="relative">
                  <Icon
                    size={22}
                    className={cn(
                      "text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors"
                    )}
                  />
                </div>
                <span className="text-xs mt-1 text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full p-2 transition-all",
                "active:scale-95"
              )}
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={cn(
                    "transition-colors",
                    tab.active
                      ? "text-primary dark:text-primary-light"
                      : "text-slate-500 dark:text-slate-400"
                  )}
                />
                
              </div>
              <span
                className={cn(
                  "text-xs mt-1 transition-colors",
                  tab.active
                    ? "text-primary dark:text-primary-light font-medium"
                    : "text-slate-500 dark:text-slate-400"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileTabbar;