export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-royal-blue via-deep-blue to-soft-purple">
      

      <div className="w-full max-w-md z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Church Management
          </h1>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
