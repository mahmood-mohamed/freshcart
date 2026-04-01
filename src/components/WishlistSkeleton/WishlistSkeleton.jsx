import { Skeleton, Card } from "@heroui/react";

export default function WishlistSkeleton() {
  return (
    <div className="container mx-auto py-12 animate-pulse">
      <div className="flex items-center justify-between mb-8 px-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-5 w-64 rounded-lg" />
        </div>
        <Skeleton className="h-6 w-24 rounded-lg" />
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <Card key={item} className="flex flex-col border border-gray-100 shadow-sm p-3 h-[380px]">
            <Skeleton className="w-full h-48 rounded-md mb-4" />
            <div className="flex flex-col grow justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </div>
              <div className="pt-4 flex justify-between">
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>
              <div className="flex grow items-end justify-around pt-3 gap-2">
                <Skeleton className="h-8 flex-1 rounded-md" />
                <Skeleton className="h-8 flex-1 rounded-md" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
