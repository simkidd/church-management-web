import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function QuizLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string; quizId: string }>;
}) {
  const { courseId } = await params;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={`/courses/${courseId}/learn`}
            className="inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-primary"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to learning
          </Link>

          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            Quiz
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
