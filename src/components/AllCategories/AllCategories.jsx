import { Skeleton } from "@heroui/react";

export default function AllCategories({ data, error, isLoading, setSelectedCategory }) {
  if (isLoading) {
    return (
      <>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <Skeleton className="w-full h-48">
              <div className="w-full h-full bg-default-300"></div>
            </Skeleton>
            <div className="flex items-center justify-between p-2">
              <Skeleton className="w-1/2 h-4 rounded-lg">
                <div className="w-full h-full bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-16 h-4 rounded-lg">
                <div className="w-full h-full bg-default-200"></div>
              </Skeleton>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (error) {
    return<div className="text-center text-xl font-semibold text-red-500">
      Error loading categories {error.message}
    </div>;
  }

  return (
    <>
      {data?.map((category) => (
        <div
          key={category._id}
          className="bg-gray-100 rounded-lg shadow-md overflow-hidden"
        >
          <img src={category.image} alt={category.name} className="w-full h-48 object-scale" />
          <div className="flex items-center justify-between p-2">
            <h3 className="text-sm font-medium">{category.name}</h3>
            <button
              className="text-blue-600 hover:underline mt-1 inline-block cursor-pointer"
              onClick={() => setSelectedCategory(category._id)}
            >
              Explore
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
