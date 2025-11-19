import { Card, CardContent } from "@/components/ui/card";
import { ILesson } from "@/interfaces/course.interface";

interface VideoPlayerProps {
  currentLesson: ILesson;
  videoProgress: number;
  onVideoProgress: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
}

const VideoPlayer = ({
  currentLesson,
  videoProgress,
  onVideoProgress,
}: VideoPlayerProps) => {
  if (!currentLesson.video?.url) return null;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-video bg-black relative">
          <video
            controls
            className="w-full h-full"
            onTimeUpdate={onVideoProgress}
            
          >
            <source src={currentLesson.video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {videoProgress > 0 && videoProgress < 100 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2">
              <span>Watched: {Math.round(videoProgress)}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;