import CourseCertificate from "@/components/courses/certificate/CourseCertificate";

export default async function CourseCertificatePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return (
    <div className="h-full overflow-y-auto">
      <CourseCertificate courseId={courseId} />
    </div>
  );
}
