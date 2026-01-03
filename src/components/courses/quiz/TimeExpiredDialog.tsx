"use client";
import { useQuizStore } from "@/stores/quiz.store";
import { ArrowRight, TimerOff } from "lucide-react";
import { useRouter } from "next/navigation";

const TimeExpiredDialog = () => {
  const router = useRouter();
  const { attemptId } = useQuizStore();

  return (
    <main className="flex-1 w-full flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-warm-2/5 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-120 w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-black/20 border border-stone-light/60 dark:border-stone-dark overflow-hidden transform transition-all">
        <div className="pt-12 pb-6 flex justify-center relative">
          <div className="absolute inset-0 bg-linear-to-b from-stone-50/50 to-transparent dark:from-stone-900/10"></div>
          <div className="relative z-10">
            <div className="absolute inset-0 bg-accent-warm-2/20 blur-2xl rounded-full scale-150 animate-pulse"></div>

            <div className="relative size-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border-4 border-stone-50 dark:border-slate-700 shadow-sm">
              <TimerOff size={56} className="text-accent-warm-2" />
            </div>
          </div>
        </div>
        <div className="px-8 pb-10 text-center flex flex-col gap-4 relative z-10">
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-text-main dark:text-gray-50 tracking-tight">
              Time Expired!
            </h1>
            <p className="text-text-muted dark:text-gray-400 text-base leading-relaxed">
              Don&apos;t worry, your quiz has been{" "}
              <span className="text-primary dark:text-primary-light font-medium">
                automatically submitted
              </span>
              . We are now processing your results.
            </p>
          </div>
          <div className="h-px w-24 mx-auto bg-stone-200 dark:bg-slate-700 my-4"></div>
          <div className="flex flex-col gap-3 w-full">
            <button
              className="w-full py-3.5 px-6 rounded-xl bg-primary dark:bg-primary-light hover:bg-primary-dark text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 font-bold text-base flex items-center justify-center gap-2 group cursor-pointer"
              onClick={() => router.push(`/courses/quiz-attempts/${attemptId}`)}
              disabled={!attemptId}
            >
              <span>View Results</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform "
              />
            </button>
            {/* <button className="w-full py-3.5 px-6 rounded-xl bg-transparent border border-stone-200 dark:border-stone-600 text-text-main dark:text-gray-200 hover:bg-stone-50 dark:hover:bg-stone-dark/40 transition-colors font-semibold text-base">
              Return to Course
            </button> */}
          </div>
          {/* <div className="mt-2">
            <a
              className="inline-flex items-center gap-1 text-sm font-medium text-text-muted hover:text-text-main dark:text-gray-500 dark:hover:text-gray-300 transition-colors py-2 px-4 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-dark/30"
              href="#"
            >
              <span className="material-symbols-outlined text-lg">
                dashboard
              </span>
              Go to Dashboard
            </a>
          </div> */}
        </div>
        <div className="h-1.5 w-full bg-linear-to-r from-primary/80 via-accent-warm-2/80 to-primary/80"></div>
      </div>
    </main>
  );
};

export default TimeExpiredDialog;
