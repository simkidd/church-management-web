"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
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
  MailCheck
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
      <div className="space-y-4 max-w-md w-full">
        <div className="flex justify-center">
          {/* <!-- Icon Container --> */}
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck size={36} />
          </div>
        </div>
        {/* <!-- Main Heading --> */}
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Check your mail
        </h1>
        {/* <!-- Body Text --> */}
        <p className="mb-8 text-center text-[#637288] dark:text-gray-400 text-sm leading-relaxed">
          We have sent password recovery instructions to your email{" "}
          <span className="font-medium text-sm text-foreground mt-2">
            {sentEmail}
          </span>
          . Please check your inbox and follow the link to reset your password.
        </p>
        {/* <!-- Primary Action Button --> */}
        <Link href={'/auth/login'}>
          <button className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary py-3.5 px-4 text-sm font-bold text-white shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200">
            Return to Login
          </button>
        </Link>
         
        {/* <!-- Divider / Separator --> */}
        <div className="relative my-8 w-full">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center"
          >
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-background-dark px-2 text-sm text-gray-400 uppercase">
              or
            </span>
          </div>
        </div>
        {/* <!-- Resend Link --> */}
        <div className="text-center">
          <p className="text-sm text-[#637288] dark:text-gray-400">
            Did not receive the email?
            <button
              className="ml-1 font-semibold text-primary hover:underline transition-colors focus:outline-none cursor-pointer dark:text-primary-light hover:text-primary"
              onClick={() => {
                setIsEmailSent(false);
                form.reset();
              }}
            >
              Click to resend
            </button>
          </p>
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Check your spam folder just in case.
          </p>
        </div>
      </div>
    );
  }

  // Form state
  return (
    <div className="max-w-md w-full flex flex-col gap-4">
      <div className="mb-8 text-left">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[#111418] dark:text-white tracking-tight mb-3">
          Reset Password
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
          Enter the email associated with your account and we’ll send you a link
          to reset your password.
        </p>
      </div>

      <form id="forgot-password-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="forgot-email">Email Address</FieldLabel>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary dark:group-focus-within:text-primary-light transition-colors">
                    <Mail size={20} />
                  </div>
                  <Input
                    {...field}
                    id="forgot-email"
                    type="email"
                    placeholder="admin@church.org"
                    className="block w-full h-full pl-11 pr-4 py-4 rounded-xl bg-surface-light-2 dark:bg-surface-dark border-transparent focus:border-primary focus:bg-white dark:focus:bg-[#1a222d] focus:ring-2 focus:ring-primary/20 text-[#111418] dark:text-white placeholder-gray-400 transition-all duration-200 outline-none font-medium"
                    aria-invalid={fieldState.invalid}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <Button
              type="submit"
              form="forgot-password-form"
              className="w-full h-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-base shadow-lg shadow-primary/30 hover:shadow-primary/40 active:scale-[0.98] transition-all duration-200"
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
        </FieldGroup>
      </form>

      <div className="relative flex items-center justify-center my-2">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-700/50"></div>
        </div>
        <h2 className="relative bg-white dark:bg-background-dark px-2 text-xs text-slate-400 uppercase tracking-wider font-medium">
          Or
        </h2>
      </div>

      <Link
        className="group flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-4 py-3.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
        href="/auth/login"
      >
        <ArrowLeft
          size={18}
          className="transition-transform duration-200 group-hover:-translate-x-1"
        />
        Back to Login
      </Link>
    </div>
  );
};

export default ForgotPasswordForm;
