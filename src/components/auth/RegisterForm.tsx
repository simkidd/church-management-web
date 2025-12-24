"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RegisterData } from "@/interfaces/auth.interface";
import { ApiErrorResponse } from "@/interfaces/response.interface";
import authApi from "@/lib/api/auth.api";
import { formatPhoneNumber } from "@/utils/helpers/phone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  User
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Define the form schema with Zod
const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        /^(\+?234|0)[789][01]\d{8}$/,
        "Please enter a valid Nigerian phone number"
      ),
    gender: z.enum(["male", "female"], {
      error: "Please select your gender",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      gender: undefined,
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterData) => authApi.register(payload),
    onSuccess: () => {
      setTimeout(() => {
        router.push("/auth/login");
      }, 300);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message || "Sign up failed. Please try again.";
      toast.error("Sign up Failed", {
        description: errorMessage,
        duration: 5000,
      });
    },
  });

  const onSubmit = (data: FormData) => {
    const formattedPhone = formatPhoneNumber(data.phone);

    const payload: RegisterData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: formattedPhone,
      gender: data.gender,
    };

    registerMutation.mutate(payload);
  };

  const isLoading = registerMutation.isPending;

  if (registerMutation.isSuccess) {
    return (
      <div className="max-w-md w-full">
        {/* <!-- Success Icon --> */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
            <CheckCircle2 size={36} className="text-primary" />
          </div>
          {/* <!-- Headline --> */}
          <h1 className="text-[#111418] dark:text-white text-3xl font-bold leading-tight tracking-[-0.033em] mb-4">
            Welcome to the Family!
          </h1>
          {/* <!-- Body Text --> */}
          <p className="text-[#637288] dark:text-gray-400 text-sm font-normal leading-relaxed mb-8">
            Your account has been successfully created. We&apos;ve sent a
            verification link to your email address. Please check your inbox to
            activate your account and start your journey with us.
          </p>
        </div>

        <p className="text-xs text-muted-foreground text-center mb-8">
          Redirecting to login...
        </p>

        {/* <!-- Action Area --> */}
        <div className="flex flex-col gap-4">
          {/* <!-- Primary Button --> */}
          <Link href={"/auth/login"}>
            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl py-3.5 px-5 bg-primary hover:bg-primary-light transition-colors duration-200 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-blue-500/20">
              <span className="truncate">Proceed to Login</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full">
      <div className="mb-8 text-left">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[#111418] dark:text-white tracking-tight mb-3">
          Create Account
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
          Join our community to connect, grow, and serve together.
        </p>
      </div>

      {/* form */}
      <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-firstName">
                      First Name
                    </FieldLabel>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary dark:group-focus-within:text-primary-light transition-colors">
                        <User size={20} />
                      </div>
                      <Input
                        {...field}
                        id="register-firstName"
                        placeholder="John"
                        className="block w-full h-full pl-11 pr-4 py-4 rounded-xl bg-surface-light-2 dark:bg-surface-dark border-transparent focus:border-primary focus:bg-white dark:focus:bg-[#1a222d] focus:ring-2 focus:ring-primary/20 text-[#111418] dark:text-white placeholder-gray-400 transition-all duration-200 outline-none font-medium"
                        aria-invalid={fieldState.invalid}
                        disabled={isLoading}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-lastName">
                      Last Name
                    </FieldLabel>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary dark:group-focus-within:text-primary-light transition-colors">
                        <User size={20} />
                      </div>
                      <Input
                        {...field}
                        id="register-lastName"
                        placeholder="Doe"
                        className="block w-full h-full pl-11 pr-4 py-4 rounded-xl bg-surface-light-2 dark:bg-surface-dark border-transparent focus:border-primary focus:bg-white dark:focus:bg-[#1a222d] focus:ring-2 focus:ring-primary/20 text-[#111418] dark:text-white placeholder-gray-400 transition-all duration-200 outline-none font-medium"
                        aria-invalid={fieldState.invalid}
                        disabled={isLoading}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-email">Email</FieldLabel>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary dark:group-focus-within:text-primary-light transition-colors">
                      <Mail size={20} />
                    </div>
                    <Input
                      {...field}
                      id="register-email"
                      type="email"
                      placeholder="john@example.com"
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

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-phone">Phone Number</FieldLabel>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary dark:group-focus-within:text-primary-light transition-colors">
                      <Phone size={20} />
                    </div>

                    <Input
                      {...field}
                      id="register-phone"
                      type="tel"
                      placeholder="+234 (803) 123-4567"
                      className="block w-full h-full pl-11 pr-12 py-4 rounded-xl bg-surface-light-2 dark:bg-surface-dark border-transparent focus:border-primary focus:bg-white dark:focus:bg-[#1a222d] focus:ring-2 focus:ring-primary/20 text-[#111418] dark:text-white placeholder-gray-400 transition-all duration-200 outline-none font-medium"
                      aria-invalid={fieldState.invalid}
                      disabled={isLoading}
                      autoComplete="tel"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Gender</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className=" w-full h-full! px-4 py-4 rounded-xl bg-surface-light-2 dark:bg-surface-dark border-transparent focus:border-primary focus:bg-white dark:focus:bg-[#1a222d] focus:ring-2 focus:ring-primary/20 text-[#111418] dark:text-white placeholder-gray-400 transition-all duration-200 outline-none font-medium cursor-pointer">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-password">
                      Password
                    </FieldLabel>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary dark:group-focus-within:text-primary-light transition-colors">
                        <Lock size={20} />
                      </div>
                      <Input
                        {...field}
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="block w-full h-full pl-11 pr-12 py-4 rounded-xl bg-surface-light-2 dark:bg-surface-dark border-transparent focus:border-primary focus:bg-white dark:focus:bg-[#1a222d] focus:ring-2 focus:ring-primary/20 text-[#111418] dark:text-white placeholder-gray-400 transition-all duration-200 outline-none font-medium"
                        aria-invalid={fieldState.invalid}
                        disabled={isLoading}
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary dark:group-focus-within:text-primary-light transition-colors">
                        <Lock size={20} />
                      </div>
                      <Input
                        {...field}
                        id="register-confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="block w-full h-full pl-11 pr-12 py-4 rounded-xl bg-surface-light-2 dark:bg-surface-dark border-transparent focus:border-primary focus:bg-white dark:focus:bg-[#1a222d] focus:ring-2 focus:ring-primary/20 text-[#111418] dark:text-white placeholder-gray-400 transition-all duration-200 outline-none font-medium"
                        aria-invalid={fieldState.invalid}
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors cursor-pointer focus:outline-none"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
          <Field>
            <Button
              type="submit"
              form="register-form"
              className="w-full h-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-base shadow-lg shadow-primary/30 hover:shadow-primary/40 active:scale-[0.98] transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            className="font-bold text-primary dark:text-primary-light hover:text-primary transition-colors"
            href="/auth/login"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
