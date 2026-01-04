"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/auth.store";
import { format } from "date-fns";
import React from "react";

const UserInfo = () => {
  const { user, hasHydrated } = useAuthStore();

  const userName = `${user?.firstName} ${user?.lastName}`;

  const getUserInitials = () => {
    if (!userName) return "U";
    return userName
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  if (!hasHydrated || !user) {
    return (
      <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex flex-col items-center text-center animate-pulse">
        <Skeleton className="h-24 w-24 rounded-full mb-4 dark:bg-slate-900/40" />
        <Skeleton className="h-6 w-32 mb-2 dark:bg-slate-900/40" />
        <Skeleton className="h-4 w-20 mb-1 dark:bg-slate-900/40" />
        <Skeleton className="h-4 w-24 dark:bg-slate-900/40" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex flex-col items-center text-center relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-primary/10 to-transparent"></div>
      <div className="relative mb-4 mt-2">
        <Avatar className="h-24 w-24 ring-4 ring-white dark:ring-slate-600 transition-colors">
          <AvatarImage src={user?.avatar?.url} alt={`${userName}'s avatar`} />
          <AvatarFallback className="border-accent-warm-2 text-accent-warm-2 font-semibold bg-accent-warm text-2xl">
            {getUserInitials()}
          </AvatarFallback>
        </Avatar>
      </div>
      <h1 className="text-lg font-bold text-slate-900 dark:text-white">
        {userName}
      </h1>
      <p className="text-xs text-primary dark:text-primary-light font-medium mb-1 uppercase tracking-wide">
        Worship Team
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Member since{" "}
        {user?.createdAt ? format(new Date(user.createdAt), "yyyy") : "—"}{" "}
      </p>
    </div>
  );
};

export default UserInfo;
