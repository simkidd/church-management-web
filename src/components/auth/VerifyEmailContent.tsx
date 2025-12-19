"use client";

import { ApiErrorResponse } from "@/interfaces/response.interface";
import authApi from "@/lib/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  MailCheck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldDescription } from "../ui/field";
import { config } from "@/utils/config";

const VerifyEmailContent = ({ token }: { token: string }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const verifyMutation = useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: (data) => {
      console.log(data.message);
      setTimeout(() => router.push("/auth/login"), 3000);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset email. Please try again.";
      console.log(
        "verification failed:",
        error.response?.data?.message || "Invalid or expired verification link"
      );
      setErrorMessage(errorMessage);
    },
  });

  useEffect(() => {
    if (token) {
      verifyMutation.mutate(token);
    }
  }, [token]);

  const handleRetry = () => {
    verifyMutation.mutate(token);
  };

  if (verifyMutation.isPending) {
    return (
      <div className="w-full max-w-md">
        {/* <!-- Icon Status --> */}
        <div className="flex justify-center">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck size={36} />
          </div>
        </div>
        {/* <!-- Main Messaging --> */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-[#111418] dark:text-white sm:text-4xl">
            Verifying your email...
          </h1>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400 leading-relaxed">
            Please wait a moment while we confirm your identity and secure your
            account access.
          </p>
        </div>
        {/* <!-- Progress Indicator --> */}
        <div className="flex flex-col gap-3 p-1">
          <div className="flex gap-6 justify-between items-end">
            <p className="text-[#111418] dark:text-gray-200 text-sm font-semibold leading-normal">
              Processing
            </p>
            <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded">
              75%
            </span>
          </div>
          {/* <!-- Progress Bar Track --> */}
          <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            {/* <!-- Progress Bar Fill --> */}
            <div
              className="h-full rounded-full bg-primary shadow-[0_0_10px_rgba(48,125,232,0.5)]"
              style={{ width: "75%" }}
            ></div>
          </div>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Estimating time remaining: a few seconds
          </p>
        </div>
      </div>
    );
  }

  if (!verifyMutation.isSuccess) {
    return (
      <div className="w-full max-w-md">
        {/* <!-- Icon Status --> */}
        <div className="flex justify-center">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 size={36} />
          </div>
        </div>
        {/* <!-- Main Messaging --> */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-[#111418] dark:text-white sm:text-4xl mb-4">
            Email Verified!
          </h1>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400 leading-relaxed mb-10">
            Welcome to{" "}
            <span className="text-primary dark:text-primary-light font-bold">
              {config.SITE_NAME}
            </span>
            . Thank you for confirming your email. You are now officially part
            of our digital community.
          </p>
        </div>

        <Link href={'/auth/login'}>
          <button className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary hover:bg-blue-600 transition-colors text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/25">
            <span className="truncate">Go to Login</span>
            <ArrowRight size={20} className="ml-2" />
          </button>
        </Link>
      </div>
    );
  }

  if (verifyMutation.isError) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
            <XCircle className="w-10 h-10 text-destructive" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Verification Failed</h1>
            <p className="text-muted-foreground text-sm text-balance">
              We couldn&apos;t verify your email address.
            </p>
            <p className="text-sm text-destructive">{errorMessage}</p>
          </div>

          <Field>
            <Button onClick={handleRetry} className="w-full">
              Try Again
            </Button>
          </Field>

          <Field>
            <FieldDescription className="text-center">
              <Link href="/auth/login">Go to Login</Link>
            </FieldDescription>
          </Field>
        </div>
      </div>
    );
  }

  return null;
};

export default VerifyEmailContent;
