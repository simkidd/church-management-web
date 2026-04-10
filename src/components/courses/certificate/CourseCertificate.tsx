"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import confetti from "canvas-confetti";
import { Award, Download, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { certificateApi } from "@/lib/api/certificate.api";
import { ApiErrorResponse } from "@/interfaces/response.interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CertificateViewer from "./CertificateViewer";

/* ---------------- CONFETTI ---------------- */
const fireConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 },
  });
};

/* ---------------- LOADER ---------------- */
const Loader = () => (
  <div className="flex min-h-dvh flex-col items-center justify-center gap-3 text-muted-foreground">
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
    <p className="text-sm">Preparing your certificate...</p>
  </div>
);

/* ---------------- MAIN ---------------- */
const CourseCertificate = ({ courseId }: { courseId: string }) => {
  const hasCelebrated = useRef(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const certificateQuery = useQuery({
    queryKey: ["course-certificate", courseId],
    queryFn: () => certificateApi.getMyCourseCertificate(courseId),
    retry: false,
  });

  const generateMutation = useMutation({
    mutationFn: () => certificateApi.generateCertificate(courseId),
    onSuccess: () => {
      fireConfetti();
      hasCelebrated.current = true;
      certificateQuery.refetch();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.message || "Failed to generate certificate",
      );
    },
  });

  /* ---------------- DOWNLOAD FUNCTION WITH TOAST.PROMISE ---------------- */
  const downloadCertificate = async () => {
    const certificate = certificateQuery.data?.data;
    if (!certificate?.certificateUrl) {
      toast.error("Certificate URL not available");
      return;
    }

    setIsDownloading(true);

    const downloadPromise = (async () => {
      const response = await fetch(certificate.certificateUrl as string);

      if (!response.ok) {
        throw new Error(`Failed to download: ${response.statusText}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `certificate-${courseId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      return true;
    })();

    toast.promise(downloadPromise, {
      loading: "Downloading your certificate...",
      success: () => {
        setIsDownloading(false);
        return "Certificate downloaded successfully! 🎓";
      },
      error: (error) => {
        setIsDownloading(false);
        console.error("Download error:", error);
        return "Failed to download certificate. Please try again.";
      },
    });
  };

  /* Auto-generate */
  useEffect(() => {
    const err = certificateQuery.error as AxiosError<ApiErrorResponse> | null;

    if (
      certificateQuery.isError &&
      err?.response?.status === 404 &&
      !generateMutation.isPending
    ) {
      generateMutation.mutate();
    }
  }, [certificateQuery.isError]);

  const isLoading = certificateQuery.isPending || generateMutation.isPending;

  /* ---------------- LOADING ---------------- */
  if (isLoading) return <Loader />;

  /* ---------------- ERROR ---------------- */
  if (certificateQuery.isError) {
    const error = certificateQuery.error as AxiosError<ApiErrorResponse>;

    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-xl font-semibold">Certificate not available</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {error.response?.data?.message ||
            "We couldn't load your certificate yet."}
        </p>

        <div className="mt-6 flex gap-3">
          <Button asChild variant="outline">
            <Link href={`/courses/${courseId}/learn`}>Back</Link>
          </Button>

          <Button onClick={() => generateMutation.mutate()}>Generate</Button>
        </div>
      </div>
    );
  }

  const certificate = certificateQuery.data?.data;
  if (!certificate) return null;

  /* ---------------- UI ---------------- */
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      {/* HEADER */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-primary dark:text-primary-light">
          <Award className="h-5 w-5" />
          <span className="text-sm font-medium">Certificate Earned</span>
        </div>

        <h1 className="mt-2 text-3xl font-bold">🎉 Congratulations</h1>

        <p className="text-muted-foreground">
          Your certificate is ready for download
        </p>
      </div>

      {/* PDF VIEWER */}
      <Card className="overflow-hidden border py-0">
        <CardContent className="p-0">
          {certificate.certificateUrl ? (
            <CertificateViewer url={certificate.certificateUrl} />
          ) : (
            <div className="p-10 text-center text-muted-foreground">
              No certificate preview available
            </div>
          )}
        </CardContent>
      </Card>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          onClick={downloadCertificate}
          disabled={isDownloading}
          className="w-full sm:w-auto text-white"
        >
          {isDownloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download Certificate
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CourseCertificate;
