import { Skeleton } from "@/components/ui/skeleton";

const CourseLearningSkeleton = () => {
  return (
    <div className="flex h-full min-h-0 bg-slate-50 dark:bg-slate-950">
      <aside className="hidden h-full w-90 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex lg:flex-col">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-3 h-5 w-4/5" />

          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-3 w-10" />
            </div>
            <Skeleton className="h-1.5 w-full" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/30"
            >
              <div className="px-4 py-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-2 h-4 w-3/4" />
                <Skeleton className="mt-2 h-3 w-24" />
              </div>

              <div className="space-y-2 border-t border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
                {Array.from({ length: 2}).map((__, lessonIdx) => (
                  <div
                    key={lessonIdx}
                    className="flex items-start gap-3 rounded-xl px-3 py-2"
                  >
                    <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-4 w-11/12" />
                      <Skeleton className="mt-2 h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <Skeleton className="h-3 w-44" />
              <Skeleton className="mt-3 h-7 w-72 sm:w-96" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-10 w-28 rounded-md" />
              <Skeleton className="h-10 w-36 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-6 p-4 sm:p-6 lg:p-8 container mx-auto">
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900">
              <Skeleton className="aspect-video w-full rounded-none" />
            </div>

            <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseLearningSkeleton;
