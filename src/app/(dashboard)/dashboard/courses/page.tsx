import { CourseGrid } from "@/components/dashboard/courses/CourseGrid";
import PageTitle from "@/components/shared/PageTitle";

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle
          title="Courses"
          subtitle="Manage all courses and lessons"
        />
      </div>

      <CourseGrid />
    </div>
  );
}
