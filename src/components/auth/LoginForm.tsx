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
import { LoginCredentials } from "@/interfaces/auth.interface";
import { ApiErrorResponse } from "@/interfaces/response.interface";
import authApi from "@/lib/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define the form schema with Zod
const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

const LoginForm = () => {
  const { setUser, setTokens } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (payload: LoginCredentials) => authApi.login(payload),
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data.data;

      console.log("login>>", {
        message: data.message,
        data: data.data,
      });

      // Update store
      setUser(user);
      setTokens({ accessToken, refreshToken });

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      toast.success(data.message, {
        description: `Welcome back, ${user.firstName}! Redirecting to your dashboard...`,
      });

      const finalRedirectPath = getFinalRedirectPath(user.role, redirectUrl);
      setTimeout(() => {
        router.push(finalRedirectPath);
      }, 1500);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      // You can handle specific error messages here
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error("Login Failed", {
        description: errorMessage,
        duration: 5000,
      });

      console.error("Login error:", error);
    },
  });

  // Helper function to determine final redirect path
  const getFinalRedirectPath = (role: string, redirectParam: string | null) => {
    // Priority 1: Use redirect URL from middleware if present
    if (redirectParam) {
      return redirectParam;
    }

    // Priority 2: Fall back to role-based default
    return getRoleBasedRedirectPath(role);
  };

  // Helper function for role-based default redirects
  const getRoleBasedRedirectPath = (role: string) => {
    switch (role) {
      case "admin":
      case "super-admin":
        return "/admin/dashboard";
      case "instructor":
        return "/instructor/dashboard";
      case "pastor":
        return "/pastor/dashboard";
      case "member":
      default:
        return "/member/dashboard";
    }
  };

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data);
  };

  const isLoading = loginMutation.isPending;

  return (
    <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email">Email</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...field}
                  id="login-email"
                  type="email"
                  placeholder="john@example.com"
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

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...field}
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  aria-invalid={fieldState.invalid}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button
            type="submit"
            form="login-form"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </Field>
        <FieldDescription className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register">
            Sign up
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
