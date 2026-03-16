import CourseDetails from "@/components/courses/CourseDetails";
import { notFound } from "next/navigation";

const CoursePage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;

  if (!courseId) {
    notFound();
  }

  return (
    <div>
      <CourseDetails courseId={courseId} />
    </div>
  );
};

export default CoursePage;
