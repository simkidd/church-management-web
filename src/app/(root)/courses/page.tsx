import CoursesGrid from "@/components/courses/CoursesGrid";
import FeaturedCourse from "@/components/courses/FeaturedCourse";
import TitleAndFilter from "@/components/courses/TitleAndFilter";
import React from "react";

const CoursesPage = () => {
  return (
    <div className="space-y-10">
      <TitleAndFilter />
      <FeaturedCourse />
      <CoursesGrid />
    </div>
  );
};

export default CoursesPage;
