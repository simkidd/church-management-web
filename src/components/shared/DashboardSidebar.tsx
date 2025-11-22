"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import {
  BookOpen,
  Church,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardNavUser from "./DashboardNavUser";
import Logo from "./Logo";
import { config } from "@/utils/config";

interface ISidebarMenu {
  title: string;
  url: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  items?: ISidebarMenu[];
}

const navItems: ISidebarMenu[] = [
  { icon: LayoutDashboard, title: "Dashboard", url: "/dashboard" },
  { icon: BookOpen, title: "Courses", url: "/dashboard/courses" },
];

const secondaryNavItems: ISidebarMenu[] = [
  { icon: User, title: "Profile", url: "/dashboard/profile" },
  { icon: Settings, title: "Settings", url: "/dashboard/settings" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, hasHydrated } = useAuthStore();
  const { setOpenMobile } = useSidebar();

  const isItemActive = (itemUrl: string) => {
    if (itemUrl === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(`${itemUrl}/`) || pathname === itemUrl;
  };

  if (!hasHydrated) {
    return (
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="px-2 py-2 border-b min-h-16 flex items-center justify-center">
          <div className="flex items-center py-1">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <Logo className="h-8" />
              {config.SITE_NAME}
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <div className="p-4 space-y-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </SidebarContent>

        <SidebarFooter className="p-2 border-t shrink-0">
          <div className="flex items-center gap-3 p-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-1 flex-col space-y-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </SidebarFooter>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="px-2 py-2 border-b min-h-16 flex items-center justify-center">
        <div className="flex items-center py-1">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setOpenMobile(false)}
          >
            <div
              className={cn(
                "aspect-square transition-all duration-200",
                "group-data-[collapsible=icon]:block",
                "group-data-[collapsible=icon]:w-8",
                "group-data-[state=expanded]:hidden",
                "hidden md:block"
              )}
            >
              <Logo className="h-8" />
            </div>
            <div
              className={cn(
                "transition-all duration-200",
                "group-data-[collapsible=icon]:hidden",
                "group-data-[state=expanded]:block"
              )}
            >
              <div className="flex items-center gap-2 font-medium text-nowrap">
                <Logo className="h-8" />
                {config.SITE_NAME}
              </div>
            </div>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1 flex flex-col min-h-0">
          {/* Main Navigation Items */}
          <SidebarMenu className="p-2">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    asChild
                    isActive={isItemActive(item.url)}
                    className="w-full justify-start"
                    tooltip={item.title}
                    onClick={() => setOpenMobile(false)}
                  >
                    <Link
                      href={item.url}
                      className="h-full w-full flex items-center"
                    >
                      {Icon && <Icon size={18} />}
                      <span className="sidebar-collapsed:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>

                  {item.items && item.items.length > 0 && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.items.map((subItem) => (
                        <SidebarMenuButton
                          key={subItem.url}
                          asChild
                          isActive={isItemActive(subItem.url)}
                          size="sm"
                          className="w-full justify-start"
                          tooltip={subItem.title}
                          onClick={() => setOpenMobile(false)}
                        >
                          <Link
                            href={subItem.url}
                            className="h-full w-full flex items-center"
                          >
                            <span className="sidebar-collapsed:hidden text-sm">
                              {subItem.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </ScrollArea>

        {/* Secondary Navigation Items */}
        <Separator />
        <SidebarMenu className="p-2">
          {secondaryNavItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={i}>
                <SidebarMenuButton
                  asChild
                  isActive={isItemActive(item.url)}
                  className="w-full justify-start"
                  tooltip={item.title}
                  onClick={() => setOpenMobile(false)}
                >
                  <Link
                    href={item.url}
                    className="h-full w-full flex items-center px-4 py-2"
                  >
                    {Icon && <Icon size={18} />}
                    <span className="sidebar-collapsed:hidden">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t shrink-0">
        <DashboardNavUser user={user!} />
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;
