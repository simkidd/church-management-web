"use client";
import { ApiErrorResponse } from "@/interfaces/response.interface";
import courseApi from "@/lib/api/course.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowRight } from "lucide-react";
import React, { use } from "react";
import { toast } from "sonner";

const EnrollmentCTA = ({ courseId }: { courseId: string }) => {
  const queryClient = useQueryClient();

  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => courseApi.enrollInCourse(courseId),
    onSuccess: () => {
      toast.success("Successfully enrolled in the course!");
      queryClient.invalidateQueries({
        queryKey: ["course-modules", courseId],
      });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses-infinite"] });
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast.error(
        err.response?.data.message || "An error occurred during enrollment."
      );
    },
  });

  return (
    <div className="bg-linear-to-br from-primary to-primary-dark rounded-3xl p-6 sm:p-8 shadow-lg shadow-primary/20 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold mb-2">
            Ready to start your journey?
          </h3>
          <p className="text-blue-100 text-sm leading-relaxed mb-4">
            Enroll now to get lifetime access to all 4 modules, 24 lessons,
            downloadable study guides, and your certificate of completion.
          </p>
        </div>
        <div className="shrink-0">
          <button
            className="px-8 py-4 rounded-xl bg-white text-primary hover:bg-blue-50 shadow-xl text-base font-bold transition-all transform hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
            disabled={enrollMutation.isPending}
            onClick={() => enrollMutation.mutate(courseId)}
          >
            {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCTA;
