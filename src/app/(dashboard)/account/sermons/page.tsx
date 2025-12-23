import SavedSermonsGrid from "@/components/account/sermons/SavedSermonsGrid";

const SavedSermonsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-linear-to-r from-white to-slate-50 dark:from-surface-dark dark:to-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-accent rounded-bl-full -mr-4 -mt-4 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            Saved Sermons
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl">
            Your personal collection of sermons, teachings, and worship sessions
            saved for later reflection.
          </p>
        </div>
      </div>

      <SavedSermonsGrid />
    </div>
  );
};

export default SavedSermonsPage;
