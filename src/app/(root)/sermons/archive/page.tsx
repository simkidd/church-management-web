import SermonsArchiveContent from "@/components/sermons/SermonsArchiveContent";
import Link from "next/link";
import React from "react";

const SermonsArchive = () => {
  return (
    <div className="space-y-12">
      {/* <!-- Breadcrumbs & Heading Area --> */}
      <div className="mb-8 container px-4 mx-auto">
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <Link
            className="text-[#637288] hover:text-primary text-sm font-medium"
            href="/"
          >
            Home
          </Link>
          <span className="text-[#637288]">/</span>
          <Link
            className="text-[#637288] hover:text-primary text-sm font-medium"
            href="/sermons"
          >
            Sermons
          </Link>
          <span className="text-[#637288]">/</span>
          <span className="text-primary dark:text-white text-sm font-medium">
            Archive
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="text-[#111418] dark:text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              Sermon Archive
            </h1>
            <p className="text-[#637288] dark:text-gray-400 text-base md:text-lg">
              Browse our complete collection of messages to build your faith.
            </p>
          </div>
          <div className="hidden md:block"></div>
        </div>
      </div>
      <div className="container px-4 mx-auto">
        <SermonsArchiveContent />
      </div>
    </div>
  );
};

export default SermonsArchive;
