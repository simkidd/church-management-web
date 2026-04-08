"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Award, Download, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { certificateApi } from "@/lib/api/certificate.api";
import { ApiErrorResponse } from "@/interfaces/response.interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));

const CourseCertificate = ({ courseId }: { courseId: string }) => {
  const certificateQuery = useQuery({
    queryKey: ["course-certificate", courseId],
    queryFn: () => certificateApi.getMyCourseCertificate(courseId),
    retry: false,
  });

  const generateMutation = useMutation({
    mutationFn: () => certificateApi.generateCertificate(courseId),
    onSuccess: () => {
      toast.success("Certificate generated successfully");
      certificateQuery.refetch();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.message || "Failed to generate certificate",
      );
    },
  });

  useEffect(() => {
    const status =
      certificateQuery.error as AxiosError<ApiErrorResponse> | null;
    const isNotFound = status?.response?.status === 404;

    if (
      certificateQuery.isError &&
      isNotFound &&
      !generateMutation.isPending &&
      !generateMutation.isSuccess
    ) {
      generateMutation.mutate();
    }
  }, [certificateQuery.isError, certificateQuery.error, generateMutation]);

  if (certificateQuery.isPending || generateMutation.isPending) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-4 py-10">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-3 text-sm text-muted-foreground">
            Preparing your certificate...
          </p>
        </div>
      </div>
    );
  }

  if (certificateQuery.isError) {
    const error = certificateQuery.error as AxiosError<ApiErrorResponse>;
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Card>
          <CardContent className="py-10 text-center">
            <h1 className="text-2xl font-bold">Certificate not available</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {error.response?.data?.message ||
                "Your certificate could not be loaded yet."}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild variant="outline">
                <Link href={`/courses/${courseId}/learn`}>
                  Back to learning
                </Link>
              </Button>

              <Button
                onClick={() => generateMutation.mutate()}
                disabled={generateMutation.isPending}
              >
                Generate Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const certificate = certificateQuery.data?.data;

  if (!certificate) {
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <div className="flex items-center gap-2 text-primary">
          <Award className="h-5 w-5" />
          <span className="text-sm font-semibold">Course Completed</span>
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Your Certificate
        </h1>
        <p className="mt-1 text-muted-foreground">
          Congratulations on completing this course successfully.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="space-y-6 p-6">
          {certificate.certificateUrl ? (
            <div className="overflow-hidden rounded-xl border bg-white">
              <iframe
                src={certificate.certificateUrl}
                title="Certificate Preview"
                className="h-[75vh] w-full"
              />
            </div>
          ) : (
            <div className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
              Certificate preview is not available.
            </div>
          )}

          <div className="grid gap-4 rounded-xl border bg-muted/30 p-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Recipient</p>
              <p className="font-medium">{certificate.recipientName}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Course Title</p>
              <p className="font-medium">{certificate.courseTitle}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Certificate Number
              </p>
              <p className="font-medium">{certificate.certificateNumber}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Verification Code</p>
              <p className="font-medium">{certificate.verificationCode}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Issued Date</p>
              <p className="font-medium">{formatDate(certificate.issuedAt)}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="font-medium capitalize">{certificate.status}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {certificate.certificateUrl && (
              <Button asChild>
                <a
                  href={certificate.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download className="h-4 w-4" />
                  Download Certificate
                </a>
              </Button>
            )}

            <Button asChild variant="outline">
              <Link
                href={`/certificates/verify/${certificate.verificationCode}`}
              >
                <ExternalLink className="h-4 w-4" />
                Verify Certificate
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href={`/courses/${courseId}`}>Back to Course</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCertificate;
