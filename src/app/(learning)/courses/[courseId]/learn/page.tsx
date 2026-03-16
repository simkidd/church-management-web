import CourseLearning from "@/components/courses/learning/CourseLearning";
import courseApi from "@/lib/api/course.api";
import { notFound, redirect } from "next/navigation";

const CourseLearningPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { courseId } = await params;
  const { lesson } = await searchParams;

  return <CourseLearning courseId={courseId} />;
};

export default CourseLearningPage;
