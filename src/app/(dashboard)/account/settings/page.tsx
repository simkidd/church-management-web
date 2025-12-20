import ChangePassword from "@/components/account/settings/ChangePassword";
import DeleteAccount from "@/components/account/settings/DeleteAccount";
import UserprofileForm from "@/components/account/settings/UserprofileForm";
import { LockIcon, User2 } from "lucide-react";
import React from "react";

const AccountSettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-linear-to-r from-white to-slate-50 dark:from-surface-dark dark:to-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-accent rounded-bl-full -mr-4 -mt-4 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            Account Settings
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl">
            Manage your personal profile and system preferences
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/20">
          <User2 size={24} className="text-slate-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Profile &amp; Details
          </h3>
        </div>
        <div className="p-8">
          <UserprofileForm />
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/20">
          <LockIcon size={24} className="text-slate-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Security
          </h3>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-5">
                Change Password
              </h4>
              <ChangePassword />
            </div>
            <div className="border-t pt-8 md:pt-0 md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 md:pl-10">
              <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-5">
                Danger Zone
              </h4>

              <DeleteAccount />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
