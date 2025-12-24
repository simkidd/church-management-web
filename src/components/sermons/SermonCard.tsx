// components/sermons/SermonCard.tsx
import { ISermon } from "@/interfaces/sermon.interface";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, Play, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

interface SermonCardProps {
  sermon: ISermon;
}

export const SermonCard = ({ sermon }: SermonCardProps) => {
  return (
    <Link href={`/sermons/${sermon._id}`}>
      <Card className="group overflow-hidden pt-0">
        <div className="relative aspect-video overflow-hidden ">
          {sermon.thumbnail?.url ? (
            <Image
              src={sermon.thumbnail.url}
              alt={sermon.title}
              fill
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-purple-600">
              <span className="text-white text-4xl font-bold">
                {sermon.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
              <Play
                className="h-8 w-8 text-primary-foreground ml-1"
                fill="currentColor"
              />
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-serif font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {sermon.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-1">
            {sermon.preacher.firstName} {sermon.preacher.lastName}
          </p>

          <div className="flex items-center justify-between text-sm text-muted-foreground w-full">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {format(new Date(sermon.datePreached), "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{sermon.views}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
