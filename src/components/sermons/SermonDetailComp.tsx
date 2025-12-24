"use client";
import { useSermonView } from "@/hooks/useSermonView";
import { ApiResponse } from "@/interfaces/response.interface";
import { ISermon } from "@/interfaces/sermon.interface";
import { sermonsApi } from "@/lib/api/sermon.api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Calendar, Download, Eye, Share2, User } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns";

const SermonDetailComp = ({ sermonId }: { sermonId: string }) => {
  useSermonView(sermonId);

  const { data, isPending, isError } = useQuery<ApiResponse<ISermon>>({
    queryKey: ["sermon", sermonId],
    queryFn: () => sermonsApi.getSermonById(sermonId),
    enabled: !!sermonId,
  });

  const sermon = data?.data;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: sermon?.title,
          text: sermon?.description,
          url,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied!", {
        description: "Sermon link copied to clipboard",
      });
    }
  };

  const handleDownload = () => {
    if (sermon?.audioUrl) {
      window.open(sermon.audioUrl, "_blank");
    }
  };

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Skeleton className="w-full aspect-video mb-6" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-2/3" />
      </div>
    );
  }

  if (isError || !sermon) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Sermon Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The sermon you’re looking for doesn’t exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/sermons">Back to Sermons</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Video Player */}
      <div className="mb-6">
        {/* <VideoPlayer
          videoUrl={sermon.video.url}
          thumbnail={sermon.thumbnail?.url}
          title={sermon.title}
        /> */}
      </div>

      {/* Title and Actions */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{sermon.title}</h1>

        <div className="flex flex-wrap gap-3 mb-4">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          {sermon.audioUrl && (
            <Button variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download Audio
            </Button>
          )}
        </div>
      </div>

      {/* Metadata */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Preacher</p>
                <p className="font-medium">{sermon.preacher.firstName}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date Preached</p>
                <p className="font-medium">
                  {format(new Date(sermon.datePreached), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Views</p>
                <p className="font-medium">{sermon.views.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {sermon.scripture && (
            <>
              <Separator className="my-4" />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Scripture</p>
                <Badge variant="secondary" className="text-base">
                  {sermon.scripture}
                </Badge>
              </div>
            </>
          )}

          {sermon.tags && sermon.tags.length > 0 && (
            <>
              <Separator className="my-4" />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {sermon.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-3">About This Sermon</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {sermon.description}
          </p>
        </CardContent>
      </Card>

      {/* Back Button */}
      <div className="mt-8">
        <Link href="/sermons">
          <Button variant="outline">← Back to All Sermons</Button>
        </Link>
      </div>
    </div>
  );
};

export default SermonDetailComp;
