import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="max-w-md w-full">
      <div className="mb-8 text-left">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[#111418] dark:text-white tracking-tight mb-3">
          Welcome Back, Family
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
          Connect with your community and grow in faith.
        </p>
      </div>

      <LoginForm />

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            className="font-bold text-primary dark:text-primary-light hover:text-primary transition-colors"
            href="/auth/register"
          >
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
}
