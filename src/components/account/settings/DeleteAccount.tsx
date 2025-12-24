import { Trash2 } from "lucide-react";
import React from "react";

const DeleteAccount = () => {
  return (
    <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
      <h5 className="text-sm font-bold text-red-800 dark:text-red-300 mb-2">
        Delete Account
      </h5>
      <p className="text-xs text-red-700 dark:text-red-400 mb-4 leading-relaxed">
        Once you delete your account, there is no going back. Please be certain.
        All your data, including course progress and notes, will be permanently
        removed.
      </p>
      <button className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 font-medium text-sm shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2 cursor-pointer">
        <Trash2 size={18} />
        Delete My Account
      </button>
    </div>
  );
};

export default DeleteAccount;
