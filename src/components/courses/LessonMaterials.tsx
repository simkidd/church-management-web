"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  FileText,
  Lock,
  Download,
  Eye,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import courseApi from "@/lib/api/course.api";
import { ILessonWithState } from "@/interfaces/lesson.interface";
import { IModuleWithState } from "@/interfaces/module.interface";
import { ILessonMaterial } from "@/interfaces/course.interface";

type GroupedMaterials = {
  title: string;
  lessons: Record<
    string,
    {
      title: string;
      materials: ILessonMaterial[];
    }
  >;
};

interface Props {
  courseId: string;
  modules: IModuleWithState[];
  isEnrolled: boolean;
}

const LessonMaterials = ({
  courseId,
  modules,
  isEnrolled,
}: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(
    {},
  );

  const { data, isPending } = useQuery({
    queryKey: ["course-materials", courseId],
    queryFn: () => courseApi.getCourseMaterials(courseId),
  });

  const materials = useMemo(() => data?.data || [], [data?.data]);

  /** LOCK MAP */
  const lessonLockMap = useMemo(() => {
    const map: Record<string, boolean> = {};

    modules.forEach((module) => {
      module.lessons?.forEach((lesson: ILessonWithState) => {
        map[lesson._id] = !isEnrolled || lesson.isLockedForUser;
      });
    });

    return map;
  }, [modules, isEnrolled]);

  /** GROUP MATERIALS */
  const groupedMaterials = useMemo<GroupedMaterials[]>(() => {
    const map: Record<string, GroupedMaterials> = {};

    materials.forEach((mat) => {
      const moduleId = mat.lesson?.module?._id || "unknown";
      const moduleTitle = mat.lesson?.module?.title || "Module";

      if (!map[moduleId]) {
        map[moduleId] = {
          title: moduleTitle,
          lessons: {},
        };
      }

      const lessonId = mat.lesson?._id;

      if (!map[moduleId].lessons[lessonId]) {
        map[moduleId].lessons[lessonId] = {
          title: mat.lesson?.title,
          materials: [],
        };
      }

      map[moduleId].lessons[lessonId].materials.push(mat);
    });

    return Object.values(map);
  }, [materials]);

  /** DOWNLOAD */
  const handleDownload = async (url: string, filename?: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Download failed");

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename || "file";
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  };

  const downloadWithToast = (url: string, filename?: string) => {
    toast.promise(handleDownload(url, filename), {
      loading: "Downloading...",
      success: "Download started",
      error: "Download failed",
    });
  };

  const formatFileName = (title: string) =>
    title.replace(/[^\w\s]/gi, "").replace(/\s+/g, "_") + ".pdf";

  const toggleModule = (id: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isPending) {
    return (
      <p className="text-sm text-slate-500">Loading materials...</p>
    );
  }

  if (!groupedMaterials.length) {
    return (
      <div className="text-center text-sm text-slate-500">
        No materials available yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groupedMaterials.map((module, idx) => {
        const isOpen = openModules[idx];

        return (
          <div
            key={idx}
            className="rounded-2xl border bg-white dark:bg-slate-900"
          >
            {/* MODULE HEADER */}
            <button
              onClick={() => toggleModule(String(idx))}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {module.title}
              </h3>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-slate-400"
              >
                <ChevronDown className="w-4 h-5" />
              </motion.div>
            </button>

            {/* MODULE CONTENT */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                    {Object.values(module.lessons).map((lesson, i) => {
                      const lessonId =
                        lesson.materials?.[0]?.lesson?._id;

                      const isLocked = lessonId
                        ? lessonLockMap[lessonId]
                        : true;

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={cn(
                            "relative rounded-xl border p-4 transition-all",
                            isLocked
                              ? "bg-slate-50 dark:bg-slate-800"
                              : "hover:shadow-lg hover:border-primary/30",
                          )}
                        >
                          {/* LOCK OVERLAY */}
                          {isLocked && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-black/50 rounded-xl">
                              <Lock className="text-slate-400" />
                            </div>
                          )}

                          {/* LESSON TITLE */}
                          <div className="flex items-center gap-2 mb-3">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {lesson.title}
                            </p>
                          </div>

                          {/* MATERIALS */}
                          <div className="space-y-2">
                            {lesson.materials.map((mat) => (
                              <div
                                key={mat._id}
                                className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <FileText
                                    size={14}
                                    className="text-red-500 shrink-0"
                                  />

                                  <span className="truncate">
                                    {mat.title}
                                  </span>

                                  <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-600 rounded">
                                    PDF
                                  </span>
                                </div>

                                {!isLocked && (
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() =>
                                        setPreviewUrl(mat.file.url)
                                      }
                                      className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                                    >
                                      <Eye size={14} />
                                    </button>

                                    {mat.isDownloadable && (
                                      <button
                                        onClick={() =>
                                          downloadWithToast(
                                            mat.file.url,
                                            formatFileName(mat.title),
                                          )
                                        }
                                        className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                                      >
                                        <Download size={14} />
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* PREVIEW MODAL */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[95%] max-w-6xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-sm font-semibold">
                Preview
              </span>

              <button
                onClick={() => setPreviewUrl(null)}
                className="text-sm px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <iframe
              src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonMaterials;