import { Skeleton } from "@heroui/react";

export default function CartSkeleton() {
  return (
    <section className="container mx-auto py-12 px-4 max-w-7xl animate-pulse">
      {/* 🏷️ Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-3 w-full max-w-sm">
          <div className="flex items-center gap-4"> 
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-8 w-32 rounded-lg" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-64 rounded-lg" />
        </div>
        
        <Skeleton className="h-10 w-32 rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* 📦 Items List Skeleton */}
        <div className="lg:col-span-8 space-y-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl border border-gray-100 bg-white shadow-sm">
              <Skeleton className="w-full sm:w-32 h-32 rounded-2xl" />
              <div className="flex-1 space-y-4 w-full">
                <Skeleton className="h-5 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
                <div className="flex justify-between items-center pt-2">
                   <Skeleton className="h-6 w-24 rounded-lg" />
                   <div className="flex items-center gap-3 border border-gray-100 p-2 rounded-xl">
                     <Skeleton className="w-6 h-6 rounded-md" />
                     <Skeleton className="w-4 h-6 rounded-md" />
                     <Skeleton className="w-6 h-6 rounded-md" />
                   </div>
                   <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🧾 Order Summary Skeleton */}
        <div className="lg:col-span-4">
          <aside className="sticky top-24 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 space-y-8">
            <Skeleton className="h-7 w-48 rounded-lg" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-24 rounded-lg" />
                <Skeleton className="h-5 w-16 rounded-lg" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-24 rounded-lg" />
                <Skeleton className="h-5 w-12 rounded-lg" />
              </div>
              <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                <Skeleton className="h-5 w-28 rounded-lg" />
                <Skeleton className="h-7 w-24 rounded-lg" />
              </div>
            </div>

            {/* 💳 Payment Methods Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-32 rounded-lg" />
              <div className="space-y-2 mt-2">
                <Skeleton className="h-16 w-full rounded-2xl" />
                <Skeleton className="h-16 w-full rounded-2xl" />
              </div>
            </div>

            {/* 🚀 Checkout Actions Skeleton */}
            <Skeleton className="w-full h-14 rounded-[1.25rem] mt-6" />
            
            <div className="flex justify-center gap-4 pt-2">
               <Skeleton className="w-8 h-6 rounded" />
               <Skeleton className="w-8 h-6 rounded" />
               <Skeleton className="w-8 h-6 rounded" />
               <Skeleton className="w-8 h-6 rounded" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

