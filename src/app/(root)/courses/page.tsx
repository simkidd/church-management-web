import CoursesGrid from "@/components/courses/CoursesGrid";
import TitleAndFilter from "@/components/courses/TitleAndFilter";
import React from "react";

const CoursesPage = () => {
  return (
    <div className="space-y-10">
      <TitleAndFilter />
      <CoursesGrid />
    </div>
  );
};

export default CoursesPage;

