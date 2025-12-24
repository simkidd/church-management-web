"use client";

import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, PencilLine, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { IUser } from "@/interfaces/user.interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usersApi } from "@/lib/api/user.api";

interface AvatarUploadProps {
  user: IUser;
  position?: "top-right" | "bottom-right"; // choose position
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  user,
  position = "top-right",
}) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => usersApi.updateUserAvatar(user._id, file),
    onSuccess: () => {
      toast.success("Avatar updated");
      queryClient.invalidateQueries({ queryKey: ["user", user._id] });
    },
    onError: () => {
      toast.error("Failed to upload avatar");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => usersApi.deleteUserAvatar(user._id),
    onSuccess: () => {
      toast.success("Avatar removed");
      queryClient.invalidateQueries({ queryKey: ["user", user._id] });
    },
    onError: () => toast.error("Failed to remove avatar"),
  });

  const handleSelectFile = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadMutation.mutate(e.target.files[0]);
    }
  };

  // absolute position mapping
  const POSITION_CLASS =
    position === "top-right" ? "top-0 right-0" : "bottom-0 right-0";

  const hasAvatar = Boolean(user?.avatar?.url);

  return (
    <div className="relative inline-block">
      {/* Avatar */}
      <div className="relative">
        <Avatar className="h-24 w-24 rounded-full ring-4 ring-slate-50 dark:ring-slate-800">
          <AvatarImage
            src={
              user?.avatar?.url ||
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCPhfeh8S_Tu-6aDgt80qy920sg0E1trNoAvowBfQnyZ4P6WScWdm2Gjq5x7_90M3VS82OstPFx6BgtPEsUsH18WjxzmASbdMZSj7giSMyMpkpXxhhU-S7nOyYP85TJs0scy-mDSZcDyoJfdgiT3ia9R-xHwPCsf-r8U_poBKlwg8L-fcMD1j6WexdpISOlTTJenZOATtFOqdurY85SbVWbS3-IIDOg6y5-cinIrvVuMuGEEippX9I0kzvyIqsv8d_6tAl0Y9bufnpn"
            }
            alt="Avatar"
            className={
              uploadMutation.isPending || deleteMutation.isPending
                ? "opacity-50"
                : ""
            }
          />
          <AvatarFallback className="rounded-xl bg-linear-to-br from-primary/20 to-primary/10 text-primary text-2xl font-bold">
            {`${user?.firstName} ${user?.lastName}`
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        {(uploadMutation.isPending || deleteMutation.isPending) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>

      {/* Absolute Upload Button */}
      {/* Dropdown Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className={`absolute ${POSITION_CLASS} bg-white dark:bg-slate-700 p-2 rounded-full shadow border border-slate-200 dark:border-slate-600 text-slate-500 hover:text-primary dark:hover:text-primary-light transition-colors`}
            disabled={uploadMutation.isPending || deleteMutation.isPending}
          >
            <PencilLine className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {!hasAvatar ? (
            <DropdownMenuItem
              onClick={handleSelectFile}
              className="cursor-pointer"
            >
              <UploadCloud className="h-4 w-4" />
              Upload photo
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem
                onClick={handleSelectFile}
                className="cursor-pointer"
              >
                <UploadCloud className="h-4 w-4" />
                Change photo
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => deleteMutation.mutate()}
                variant="destructive"
                className="cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                Remove photo
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
