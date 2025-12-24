"use client";
import React from "react";
import { Loader2, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/interfaces/response.interface";
import { formatPhoneNumber } from "@/utils/helpers/phone";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AvatarUpload } from "./AvatarUpload";
import { usersApi } from "@/lib/api/user.api";

const userSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(\+?234|0)[789][01]\d{8}$/,
      "Please enter a valid Nigerian phone number"
    ),
  state: z.string(),
  city: z.string(),
  address: z.string().optional().or(z.literal("")),
  gender: z.enum(["male", "female"], {
    error: "Please select your gender",
  }),
  bio: z.string(),
});

export type UserFormData = z.infer<typeof userSchema>;

const UserprofileForm = () => {
  const queryClient = useQueryClient();
  const { user, hasHydrated } = useAuthStore();
  const [selectedState, setSelectedState] = useState(user?.state || "");

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone || "",
      city: user?.city || "",
      state: user?.state || "",
      address: user?.address || "",
      gender: user?.gender || undefined,
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UserFormData) => usersApi.updateProfile(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error("Failed to update profile.", {
        description: error.response?.data?.message || "Please try again.",
      });
    },
  });

  const handleSubmit = (data: UserFormData) => {
    const formattedData = {
      ...data,
      phone: formatPhoneNumber(data.phone),
    };
    updateMutation.mutate(formattedData);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800 items-start">
        <AvatarUpload user={user!} position="bottom-right" />

        <div className="flex-1">
          <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
            Profile Photo
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-md">
            Update your profile picture. Recommended size is 400x400px. Allowed
            formats: JPG, PNG.
          </p>
         
        </div>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FieldGroup>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    First Name
                  </FieldLabel>
                  <Input
                    {...field}
                    className="block w-full h-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                    disabled={updateMutation.isPending}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Last Name
                  </FieldLabel>
                  <Input
                    {...field}
                    className="block w-full h-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                    disabled={updateMutation.isPending}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    className="block w-full h-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                    disabled
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Phone Number
                  </FieldLabel>
                  <Input
                    {...field}
                    className="block w-full h-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                    placeholder="+234 (803) 123-4567"
                    disabled={updateMutation.isPending}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <div className="sm:col-span-2">
              <Controller
                name="bio"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      About Me
                    </FieldLabel>
                    <Textarea
                      {...field}
                      className="block w-full h-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                      rows={3}
                      disabled={updateMutation.isPending}
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium text-sm shadow-md hover:bg-primary-light transition-colors flex items-center gap-2 cursor-pointer"
              disabled={updateMutation.isPending || !form.formState.isDirty}
            >
              {updateMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}{" "}
              Save Changes
            </button>
          </div>
        </FieldGroup>
      </form>
    </>
  );
};

export default UserprofileForm;
