import CourseDetails from "@/components/courses/CourseDetails";
import courseApi from "@/lib/api/course.api";
import { notFound } from "next/navigation";
import React from "react";

const CoursePage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { data: course } = await courseApi.getCourseById(courseId);

  if(!course){
    notFound();
  }

  return (
    <div>
      <CourseDetails course={course} />
    </div>
  );
};

export default CoursePage;
