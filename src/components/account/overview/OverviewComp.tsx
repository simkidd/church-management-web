"use client";
import { useAuthStore } from "@/stores/auth.store";
import CoursesSection from "./CoursesSection";
import EventsSection from "./EventsSection";
import SermonsSection from "./SermonsSection";

const OverviewComp = () => {
  const { user, hasHydrated } = useAuthStore();

  return (
    <div className=" space-y-8">
      {/* welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-linear-to-r from-white to-slate-50 dark:from-surface-dark dark:to-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-accent rounded-bl-full -mr-4 -mt-4 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back, {user?.firstName}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Here&apos;s what&apos;s happening in your spiritual journey today.
          </p>
        </div>
      </div>

      {/* My courses section */}
      <CoursesSection />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SermonsSection />
        <EventsSection />
      </div>
    </div>
  );
};

export default OverviewComp;
