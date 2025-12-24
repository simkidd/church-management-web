import SermonDetails from "@/components/sermons/SermonDetails";
import { ISermon } from "@/interfaces/sermon.interface";
import { sermonsApi } from "@/lib/api/sermon.api";
import { notFound } from "next/navigation";

const SermonPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { data } = await sermonsApi.getSermonBySlug(slug);

  const sermon = data as ISermon;

  if (!sermon) {
    notFound();
  }

  return (
    <div>
      <SermonDetails sermon={sermon} />
    </div>
  );
};

export default SermonPage;
