function CategoryCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-emerald-100 shadow-sm flex flex-col">
      {/* arch header placeholder */}
      <div className="relative h-36 bg-gradient-to-br from-emerald-100 to-green-100 animate-pulse">
        <div className="absolute -bottom-4 left-0 w-full h-8 bg-white rounded-t-[50%]" />
      </div>
      {/* text + button placeholder */}
      <div className="pt-6 pb-4 px-4 flex flex-col items-center gap-3">
        <div className="h-3.5 w-24 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-8 w-20 rounded-xl bg-emerald-100 animate-pulse" />
      </div>
    </div>
  );
}

function CategoryCard({ category }) {
  return (
    <div
      className="group relative bg-white rounded-2xl shadow-sm border border-emerald-100
        hover:shadow-[0_6px_24px_rgba(16,185,129,0.22)] hover:-translate-y-1
        transition-all duration-300 flex flex-col overflow-hidden cursor-default"
    >
      <div className="relative h-36 bg-gradient-to-br from-emerald-400 to-green-600 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />

        <div className="absolute -bottom-4 left-0 w-full h-6 bg-white rounded-t-[50%] border-t border-emerald-100" />

        <svg
          className="absolute top-2 right-2 w-5 h-5 text-white/40 group-hover:text-white/70 group-hover:rotate-180 transition-all duration-500 ease-out"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17 8C8 10 5.9 16.17 3.82 21L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-5 8z" />
        </svg>
      </div>

      <div className="pt-3 pb-3 px-3 text-center flex flex-col items-center gap-3">
        <h3
          className="text-gray-700 text-sm font-bold truncate w-full text-center
            group-hover:text-emerald-600 transition-colors duration-200"
        >
          {category.name}
        </h3>
      </div>
    </div>
  );
}

export default function AllCategories({ data, error, isLoading }) {
  if (isLoading) return
  <>
    {[...Array(10)].map((_, i) => (
      <CategoryCardSkeleton key={i} />
    ))}
  </>

  if (error) return (
    <div className="col-span-full flex flex-col items-center gap-4 py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-400 flex items-center justify-center text-3xl">
        <i className="fas fa-exclamation-triangle" />
      </div>
      <p className="text-gray-500 font-medium">Error loading categories: {error.message}</p>
    </div>
  )

  return (
    <>
      {data?.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </>
  );
}
