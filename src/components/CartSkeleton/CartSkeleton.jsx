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
            <div key={item} className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 md:gap-6">
              
              {/* Image Skeleton */}
              <Skeleton className="w-full md:w-32 h-40 md:h-32 shrink-0 rounded-2xl" />

              {/* Product Info Skeleton */}
              <div className="flex-grow space-y-3 flex flex-col items-center md:items-start pt-2">
                <Skeleton className="h-5 md:h-6 w-full max-w-[200px] rounded-lg" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-32 rounded-lg" />
              </div>

              {/* Controls Skeleton */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-center md:items-end justify-between gap-4">
                
                {/* Quantity + Remove Skeleton */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                  <Skeleton className="h-[42px] w-[114px] rounded-2xl" />
                  <Skeleton className="w-10 h-10 rounded-2xl" />
                </div>

                {/* Subtotal Skeleton */}
                <div className="text-center md:text-right w-full sm:w-auto flex flex-col items-center md:items-end gap-1">
                  <Skeleton className="h-3 w-12 rounded-md" />
                  <Skeleton className="h-5 w-16 rounded-lg mt-1" />
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

