"use client";

import { ApiErrorResponse } from "@/interfaces/response.interface";
import authApi from "@/lib/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldDescription } from "../ui/field";

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
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Verifying Your Email</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Please wait while we verify your email address...
            </p>
            <p className="text-xs text-muted-foreground">
              This should only take a moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (verifyMutation.isSuccess) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Email Verified Successfully!</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Your email address has been successfully verified.
            </p>

            <div>
              <span className="text-sm text-muted-foreground">
                You will be redirected to login shortly
              </span>
            </div>
          </div>

          <Field>
            <FieldDescription className="text-center">
              <Link href="/auth/login">Go to Login</Link>
            </FieldDescription>
          </Field>
        </div>
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
