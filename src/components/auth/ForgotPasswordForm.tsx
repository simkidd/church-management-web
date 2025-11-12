"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ApiErrorResponse } from "@/interfaces/response.interface";
import authApi from "@/lib/api/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  ArrowLeft,
  Loader2,
  Mail,
  CheckCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

const ForgotPasswordForm = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword({ email }),
    onSuccess: (data) => {
      setIsEmailSent(true);
      setSentEmail(form.getValues("email"));
      toast.success("Email Sent", {
        description:
          data.message ||
          "Password reset instructions have been sent to your email.",
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset email. Please try again.";

      toast.error("Reset Failed", {
        description: errorMessage,
      });
    },
  });

  const onSubmit = (data: FormData) => {
    forgotPasswordMutation.mutate(data.email);
  };

  const isLoading = forgotPasswordMutation.isPending;

  // Success state - email sent
  if (isEmailSent) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Check Your Email</h1>
            <p className="text-muted-foreground text-sm text-balance">
              We&apos;ve sent password reset instructions to
            </p>
            <p className="font-medium text-sm text-foreground mt-2">
              {sentEmail}
            </p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground text-center space-y-2">
          <p>• Check your spam folder if you don&apos;t see the email</p>
          <p>• The link will expire in 1 hour</p>
          <p>• Follow the instructions in the email to reset your password</p>
        </div>

        <Field>
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              setIsEmailSent(false);
              form.reset();
            }}
          >
            Try Another Email
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            <Link href="/auth/login">Back to Login</Link>
          </FieldDescription>
        </Field>
      </div>
    );
  }

  // Form state
  return (
    <form id="forgot-password-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email address and we&apos;ll send you reset instructions
          </p>
        </div>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="forgot-email">Email Address</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...field}
                  id="forgot-email"
                  type="email"
                  placeholder="admin@church.org"
                  className="pl-10"
                  aria-invalid={fieldState.invalid}
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button
            type="submit"
            form="forgot-password-form"
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin " />
                Sending Instructions...
              </>
            ) : (
              "Send Reset Instructions"
            )}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            <Link href="/auth/login">Back to Login</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ForgotPasswordForm;
