import VerifyEmailContent from "@/components/auth/VerifyEmailContent";

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { token } = await searchParams;

  return <VerifyEmailContent token={token as string} />;
};

export default VerifyEmailPage;
