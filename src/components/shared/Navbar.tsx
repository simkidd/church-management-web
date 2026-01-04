"use client";

import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ThemeToggler } from "./ThemeToggler";
import Logo from "./Logo";
import { config } from "@/utils/config";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { useAuthStore } from "@/stores/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const SCROLL_THRESHOLD = 20;

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, hasHydrated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Sermons", href: "/sermons" },
    { name: "Events", href: "/events" },
    { name: "Courses", href: "/courses", requiresAuth: true },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (itemUrl: string) => {
    if (pathname === itemUrl) return true;
    return pathname.startsWith(`${itemUrl}/`) || pathname === itemUrl;
  };

  const userName = `${user?.firstName} ${user?.lastName}`;

  const getUserInitials = () => {
    if (!userName) return "U";
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  // Filter nav items based on authentication
  const getFilteredNavItems = () => {
    if (!hasHydrated) {
      // While hydrating, show minimal items or show nothing
      return navItems.filter((item) => !item.requiresAuth);
    }

    return navItems.filter((item) => {
      // Show Courses only if user is logged in
      if (item.requiresAuth) return !!user;
      // Show all other items
      return true;
    });
  };

  const filteredNavItems = getFilteredNavItems();

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-900 dark:text-white"
          >
            <Logo className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-3">
                {config.SITE_NAME}
              </span>
              <span className="text-xs font-medium">{config.BRANCH_NAME}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-8">
            <nav className="flex items-center gap-8">
              {filteredNavItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-medium transition-colors relative text-sm",
                    isActive(link.href)
                      ? "text-primary dark:text-primary-light font-bold border-b-2 border-primary dark:border-primary-light pb-0.5"
                      : "text-slate-600 dark:text-slate-500 hover:text-primary dark:hover:text-primary-light pb-0.5 border-b-2 border-transparent"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
              {hasHydrated && user ? (
                <Link href="/account" className="flex items-center">
                  <Avatar className="h-9 w-9 border-2 border-accent-warm-2 hover:border-accent-warm-2 transition-colors">
                    <AvatarImage
                      src={user?.avatar?.url}
                      alt={`${userName}'s avatar`}
                    />
                    <AvatarFallback className="border-accent-warm-2 text-accent-warm-2 font-semibold bg-accent-warm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="bg-primary hover:bg-primary-dark text-white h-10 px-6 rounded-full text-sm font-bold shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  Sign In
                </Link>
              )}
              <ThemeToggler />
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggler />
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <button className="h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center">
                  <Menu className="h-5 w-5" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="rounded-t-2xl bg-white dark:bg-background-dark">
                {/* Simple List Navigation */}
                <div className="p-4">
                  {filteredNavItems.map((item) => (
                    <DrawerClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-3 text-base border-b border-slate-100 dark:border-slate-800 last:border-b-0",
                          isActive(item.href)
                            ? "text-primary font-medium"
                            : "text-slate-800 dark:text-slate-200"
                        )}
                      >
                        {item.name}
                      </Link>
                    </DrawerClose>
                  ))}

                  <DrawerClose asChild>
                    <Link
                      href="/auth/login"
                      className="block py-3 text-base text-primary font-semibold mt-4 border-t border-slate-100 dark:border-slate-800 pt-4"
                    >
                      Sign In
                    </Link>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
