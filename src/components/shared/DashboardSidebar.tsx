"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout } from "@/hooks/use-logout";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import {
  Bell,
  BookOpen,
  BookText,
  Calendar,
  Church,
  FileText,
  GraduationCap,
  Heart,
  Home,
  LogOut,
  Mic,
  User,
  UserCheck,
  Users,
  Users2,
  Video
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ISidebarMenu {
  title: string;
  url: string;
  roles: string[];
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  items?: ISidebarMenu[];
}

interface INavGroup {
  title: string;
  roles: string[];
  items: ISidebarMenu[];
}

const navGroups: INavGroup[] = [
  {
    title: "Navigation",
    roles: ["member", "instructor", "pastor", "admin", "super-admin"],
    items: [
      {
        title: "Dashboard",
        url: "/[role]/dashboard",
        icon: Home,
        roles: ["member", "instructor", "pastor"],
      },
      {
        title: "Admin Dashboard",
        url: "/admin/dashboard",
        icon: Home,
        roles: ["admin", "super-admin"],
      },
      {
        title: "Academy",
        url: "/[role]/academy",
        icon: BookOpen,
        roles: ["member", "instructor", "pastor", "admin", "super-admin"],
        items: [
          {
            title: "Courses",
            url: "/[role]/academy/courses",
            roles: ["member", "instructor", "pastor", "admin", "super-admin"],
          },
          {
            title: "My Progress",
            url: "/[role]/academy/progress",
            roles: ["member", "instructor", "pastor", "admin", "super-admin"],
          },
          {
            title: "Exams",
            url: "/[role]/academy/exams",
            roles: ["member", "instructor", "pastor", "admin", "super-admin"],
          },
        ],
      },
      {
        title: "Events",
        url: "/[role]/events",
        icon: Calendar,
        roles: ["member", "instructor", "pastor", "admin", "super-admin"],
      },
      {
        title: "Counseling",
        url: "/[role]/counseling",
        icon: Heart,
        roles: ["member", "instructor", "pastor", "admin", "super-admin"],
        items: [
          {
            title: "Book Session",
            url: "/[role]/counseling",
            roles: ["member", "instructor", "pastor", "admin", "super-admin"],
          },
          {
            title: "My Bookings",
            url: "/[role]/counseling/bookings",
            roles: ["member", "instructor", "pastor", "admin", "super-admin"],
          },
        ],
      },
      {
        title: "Sermons",
        url: "/[role]/sermons",
        icon: Video,
        roles: ["member", "instructor", "pastor", "admin", "super-admin"],
      },
      // {
      //   title: "Prayers",
      //   url: "/[role]/prayers",
      //   icon: MessageCircle,
      //   roles: ["member", "instructor", "pastor", "admin", "super-admin"],
      //   items: [
      //     {
      //       title: "Prayer List",
      //       url: "/[role]/prayers",
      //       roles: ["member", "instructor", "pastor", "admin", "super-admin"],
      //     },
      //     {
      //       title: "Create Request",
      //       url: "/[role]/prayers/create",
      //       roles: ["member", "instructor", "pastor", "admin", "super-admin"],
      //     },
      //   ],
      // },
      {
        title: "Groups",
        url: "/[role]/groups",
        icon: Users2,
        roles: ["member", "instructor", "pastor", "admin", "super-admin"],
      },
    ],
  },
  {
    title: "Instructor Tools",
    roles: ["instructor", "admin", "super-admin"],
    items: [
      {
        title: "My Courses",
        url: "/[role]/my-courses",
        icon: GraduationCap,
        roles: ["instructor"],
      },
      {
        title: "Course Management",
        url: "/admin/courses",
        icon: GraduationCap,
        roles: ["admin", "super-admin"],
      },
      {
        title: "Student Progress",
        url: "/[role]/students",
        icon: Users,
        roles: ["instructor"],
      },
      {
        title: "Student Management",
        url: "/admin/users",
        icon: Users,
        roles: ["admin", "super-admin"],
      },
      {
        title: "Create Content",
        url: "/[role]/content/create",
        icon: FileText,
        roles: ["instructor"],
      },
      {
        title: "Content Management",
        url: "/admin/courses",
        icon: FileText,
        roles: ["admin", "super-admin"],
      },
      {
        title: "Grade Exams",
        url: "/[role]/grading",
        icon: BookText,
        roles: ["instructor"],
      },
      {
        title: "Exam Management",
        url: "/admin/exams",
        icon: BookText,
        roles: ["admin", "super-admin"],
      },
    ],
  },
  {
    title: "Pastor Tools",
    roles: ["pastor", "admin", "super-admin"],
    items: [
      {
        title: "Sermon Prep",
        url: "/[role]/sermon-prep",
        icon: Mic,
        roles: ["pastor"],
      },
      {
        title: "Sermon Management",
        url: "/admin/sermons",
        icon: Mic,
        roles: ["admin", "super-admin"],
      },
      {
        title: "Counseling Sessions",
        url: "/[role]/counseling",
        icon: Heart,
        roles: ["pastor"],
      },
      {
        title: "Member Care",
        url: "/[role]/member-care",
        icon: UserCheck,
        roles: ["pastor"],
      },
      {
        title: "Member Management",
        url: "/admin/users",
        icon: UserCheck,
        roles: ["admin", "super-admin"],
      },
      {
        title: "Event Planning",
        url: "/[role]/events",
        icon: Calendar,
        roles: ["pastor"],
      },
      {
        title: "Event Management",
        url: "/admin/events",
        icon: Calendar,
        roles: ["admin", "super-admin"],
      },
    ],
  },
  {
    title: "Administration",
    roles: ["admin", "super-admin"],
    items: [
      {
        title: "User Management",
        url: "/admin/users",
        icon: Users,
        roles: ["admin", "super-admin"],
        items: [
          {
            title: "All Users",
            url: "/admin/users",
            roles: ["admin", "super-admin"],
          },
          {
            title: "Create User",
            url: "/admin/users/create",
            roles: ["admin", "super-admin"],
          },
        ],
      },
      {
        title: "Course Management",
        url: "/admin/courses",
        icon: GraduationCap,
        roles: ["admin", "super-admin"],
        items: [
          {
            title: "All Courses",
            url: "/admin/courses",
            roles: ["admin", "super-admin"],
          },
          {
            title: "Create Course",
            url: "/admin/courses/create",
            roles: ["admin", "super-admin"],
          },
        ],
      },
      {
        title: "Exam Management",
        url: "/admin/exams",
        icon: BookText,
        roles: ["admin", "super-admin"],
        items: [
          {
            title: "All Exams",
            url: "/admin/exams",
            roles: ["admin", "super-admin"],
          },
          {
            title: "Create Exam",
            url: "/admin/exams/create",
            roles: ["admin", "super-admin"],
          },
        ],
      },
      {
        title: "Event Management",
        url: "/admin/events",
        icon: Calendar,
        roles: ["admin", "super-admin"],
        items: [
          {
            title: "All Events",
            url: "/admin/events",
            roles: ["admin", "super-admin"],
          },
          {
            title: "Create Event",
            url: "/admin/events/create",
            roles: ["admin", "super-admin"],
          },
        ],
      },
      {
        title: "Sermon Management",
        url: "/admin/sermons",
        icon: Church,
        roles: ["admin", "super-admin"],
        items: [
          {
            title: "All Sermons",
            url: "/admin/sermons",
            roles: ["admin", "super-admin"],
          },
          {
            title: "Create Sermon",
            url: "/admin/sermons/create",
            roles: ["admin", "super-admin"],
          },
        ],
      },
      // {
      //   title: "Announcements",
      //   url: "/admin/announcements",
      //   icon: Bell,
      //   roles: ["admin", "super-admin"],
      // },

      // {
      //   title: "Payments",
      //   url: "/admin/payments",
      //   icon: CreditCard,
      //   roles: ["admin", "super-admin"],
      // },
      // {
      //   title: "System Settings",
      //   url: "/admin/settings",
      //   icon: Settings,
      //   roles: ["super-admin"],
      // },
    ],
  },
];

// Common navigation items for all roles (outside the groups)
const commonNav: ISidebarMenu[] = [
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    roles: ["member", "instructor", "pastor", "admin", "super-admin"],
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
    roles: ["member", "instructor", "pastor", "admin", "super-admin"],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, hasHydrated } = useAuthStore();
  const { mutate: logout, isPending } = useLogout();
  const { setOpenMobile } = useSidebar();

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const isItemActive = (itemUrl: string) => {
    if (itemUrl === "/dashboard") {
      return pathname === "/dashboard";
    }
    if (itemUrl === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(`${itemUrl}/`) || pathname === itemUrl;
  };

  const userRole = user?.role;

  const hasAccess = (roles: string[]) => {
    return userRole ? roles.includes(userRole) : false;
  };

  const filterNestedItems = (items: ISidebarMenu[]): ISidebarMenu[] => {
    return items
      .filter((item) => hasAccess(item.roles))
      .map((item) => ({
        ...item,
        items: item.items ? filterNestedItems(item.items) : undefined,
      }));
  };

  if (!hasHydrated) {
    return (
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="px-2 py-2 border-b min-h-16 flex items-center justify-center">
          <div className="flex items-center py-1">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Church className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">ChurchApp</span>
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
              <Church className="h-6 w-6 text-blue-600" />
            </div>
            <div
              className={cn(
                "transition-all duration-200",
                "group-data-[collapsible=icon]:hidden",
                "group-data-[state=expanded]:block"
              )}
            >
              <span className="text-lg font-semibold">ChurchApp</span>
            </div>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1 flex flex-col min-h-0">
          {/* Role-specific navigation */}
          {navGroups
            .filter((group) => hasAccess(group.roles))
            .map((group, groupIndex) => {
              const filteredItems = filterNestedItems(group.items);
              if (filteredItems.length === 0) return null;

              return (
                <SidebarGroup key={groupIndex}>
                  <SidebarMenu className="space-y-1">
                    {filteredItems.map((item, i) => {
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
                              href={
                                item.url.includes("[role]")
                                  ? item.url.replace(
                                      "[role]",
                                      userRole || "member"
                                    )
                                  : item.url
                              }
                              className="h-full w-full flex items-center px-4 py-2"
                            >
                              {Icon && <Icon size={18} className="mr-2" />}
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
                                    href={
                                      subItem.url.includes("[role]")
                                        ? subItem.url.replace(
                                            "[role]",
                                            userRole || "member"
                                          )
                                        : subItem.url
                                    }
                                    className="h-full w-full flex items-center px-4 py-1"
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
                </SidebarGroup>
              );
            })}

          {/* Common navigation for all roles */}
          <Separator className="my-2" />
          <SidebarGroup>
            <SidebarMenu className="space-y-1">
              {commonNav
                .filter((item) => hasAccess(item.roles))
                .map((item, i) => {
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
                          {Icon && <Icon size={18} className="mr-2" />}
                          <span className="sidebar-collapsed:hidden">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t shrink-0">
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.avatar?.url}
              alt={`${user?.firstName} ${user?.lastName}`}
            />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
              {getInitials(user?.firstName, user?.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col min-w-0">
            <p className="text-sm font-medium truncate sidebar-collapsed:hidden">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground capitalize truncate sidebar-collapsed:hidden">
              {user?.role}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => logout()}
            disabled={isPending}
            className="h-8 w-8"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;
