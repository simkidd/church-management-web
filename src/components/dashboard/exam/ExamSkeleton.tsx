import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ExamSkeleton = () => {
  return (
    <div className="min-h-screen ">
      <div className=" border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-32" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div className="lg:col-span-3 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
                <div className="flex justify-between pt-4">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-10" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSkeleton;
