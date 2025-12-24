import { FeaturedSermons } from "@/components/sermons/FeaturedSermons";
import LatestSermons from "@/components/sermons/LatestSermons";
import SermonSeries from "@/components/sermons/SermonSeries";

const SermomsPage = () => {
  return (
    <div className="space-y-12">
      <FeaturedSermons />
      <LatestSermons />
      <SermonSeries />
    </div>
  );
};

export default SermomsPage;
