import LessonPageContent from "@/components/dashboard/courses/LessonPageContent";
import React from "react";

const LessonPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) => {
  const { courseId, lessonId } = await params;

  return <LessonPageContent courseId={courseId} lessonId={lessonId} />;
};

export default LessonPage;
