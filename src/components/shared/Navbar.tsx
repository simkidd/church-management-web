"use client";

import { Church, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ThemeToggler } from "./ThemeToggler";
import Logo from "./Logo";
import { config } from "@/utils/config";

const SCROLL_THRESHOLD = 20;

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Sermons", href: "/sermons" },
    { name: "Events", href: "/events" },
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (itemUrl: string) => {
    // Exact match
    if (pathname === itemUrl) return true;

    // Special case for "/admin" to prevent matching all admin routes
    if (itemUrl === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(`${itemUrl}/`) || pathname === itemUrl;
  };

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-900 dark:text-white "
          >
            <Logo className="h-8" />
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
              {navLinks.map((link) => (
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
            <div className="flex gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
              <Button
                asChild
                className="bg-primary hover:bg-primary-dark text-white h-10 px-6 rounded-full text-sm font-bold shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>

              <ThemeToggler />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-smooth",
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="gradient-primary shadow-glow">
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
