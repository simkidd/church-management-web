import ExamContent from "@/components/dashboard/exam/ExamContent";
import React from "react";

const TakeExamPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;

  return (
    <div>
      <ExamContent courseId={courseId} />
    </div>
  );
};

export default TakeExamPage;
