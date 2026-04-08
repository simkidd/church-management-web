import CourseCertificate from "@/components/courses/certificate/CourseCertificate";

export default async function CourseCertificatePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return <CourseCertificate courseId={courseId} />;
}
