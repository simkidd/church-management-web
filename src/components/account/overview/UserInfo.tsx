"use client";
import React from "react";

const UserInfo = () => {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex flex-col items-center text-center relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-primary/10 to-transparent"></div>
      <div className="relative mb-4 mt-2">
        <div
          className="size-24 rounded-full bg-cover bg-center ring-4 ring-white dark:ring-slate-800 shadow-md"
          data-alt="Sarah Jenkins profile picture"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPhfeh8S_Tu-6aDgt80qy920sg0E1trNoAvowBfQnyZ4P6WScWdm2Gjq5x7_90M3VS82OstPFx6BgtPEsUsH18WjxzmASbdMZSj7giSMyMpkpXxhhU-S7nOyYP85TJs0scy-mDSZcDyoJfdgiT3ia9R-xHwPCsf-r8U_poBKlwg8L-fcMD1j6WexdpISOlTTJenZOATtFOqdurY85SbVWbS3-IIDOg6y5-cinIrvVuMuGEEippX9I0kzvyIqsv8d_6tAl0Y9bufnpn')                ",
          }}
        ></div>
      </div>
      <h1 className="text-lg font-bold text-slate-900 dark:text-white">
        Sarah Jenkins
      </h1>
      <p className="text-xs text-primary dark:text-primary-light font-medium mb-1 uppercase tracking-wide">
        Worship Team
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Member since 2018
      </p>
    </div>
  );
};

export default UserInfo;
