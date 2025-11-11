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
    <Card className="w-full sm:max-w-md shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center">
          Sign in to continue your spiritual journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                      href="/forgot-password"
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <div className="mt-6 space-y-4">
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

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Don&apos;t have an account?
              </span>
            </div>
          </div>

          <Button asChild variant="outline" className="w-full" disabled={isLoading}>
            <Link href="/auth/register">Create Account</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
