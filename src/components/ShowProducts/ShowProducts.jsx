import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../services/api/fetchProducts";
import FiltersBar from "../FiltersBar/FiltersBar";
import Product from "../Product/Product";
import { Button, Skeleton } from "@heroui/react";
export default function ShowProducts({ hideFilters = false, limit }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL search params
  const [filters, setFilters] = useState({
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "",
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : limit, // Add limit to filters
  });

  // 1. Sync URL -> State (Handles initial load and browser Back/Forward)
  useEffect(() => {
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const sort = searchParams.get("sort") || "";
    const urlLimit = searchParams.get("limit") ? Number(searchParams.get("limit")) : limit;

    setFilters((prev) => {
      if (
        minPrice !== prev.minPrice ||
        maxPrice !== prev.maxPrice ||
        sort !== prev.sort ||
        urlLimit !== prev.limit
      ) {
        return {
          ...prev,
          minPrice,
          maxPrice,
          sort,
          limit: urlLimit,
        };
      }
      return prev;
    });
  }, [searchParams, limit]);

  // 2. Sync State -> URL (Updates URL when state changes)
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const updateParam = (key, value) => {
      if (value) params.set(key, value);
      else params.delete(key);
    };

    updateParam("minPrice", filters.minPrice);
    updateParam("maxPrice", filters.maxPrice);
    updateParam("sort", filters.sort);
    
    if (filters.limit) params.set("limit", filters.limit);
    else params.delete("limit");

    // Clean up old complex params if any
    params.delete("price[gte]");
    params.delete("price[lte]");

    // Only update if params actually changed
    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [filters, searchParams, setSearchParams]);

  const resetFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      sort: "",
      limit: limit,
    });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // Skeleton loading grid
  const SkeletonGrid = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="rounded-lg">
            <div className="h-64 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="">
      {/* 🛠 Toolbar Section */}
      {!hideFilters && (
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md mb-6">
          <div className="flex flex-col gap-2">
            <FiltersBar 
              filters={filters} 
              setFilters={setFilters} 
              resetFilters={resetFilters} 
            />
          </div>
        </div>
      )}

      {/* 🛒 Products Display */}
      {isLoading ? (
        <SkeletonGrid />
      ) : isError ? (
        <div className="text-center py-12 bg-red-50 rounded-3xl border-2 border-dashed border-red-200">
          <i className="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
          <h3 className="text-xl font-bold text-red-700">Oops! Something went wrong</h3>
          <p className="text-red-500">Failed to load products. Please try again later.</p>
        </div>
      ) : data?.pages[0]?.data.length === 0 ? (
        <div key="empty-state" className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-bold text-gray-700">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          <Button variant="light" color="success" onPress={resetFilters} className="mt-4 font-bold">
            Clear all filters
          </Button>
        </div>
      ) : (
        <div key="product-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {data?.pages.map((page) =>
            page.data.map((product) => (
              <Product key={product.id} product={product} />
            ))
          )}
        </div>
      )}

      {/* 📄 Pagination Section */}
      {!isLoading && !isError && hasNextPage && !hideFilters && (
        <div className="mt-10 flex flex-col items-center gap-4">
          <Button
            size="lg"
            color="success"
            variant="shadow"
            className="font-semibold px-10 py-4 text-sm text-white"
            onPress={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            startContent={<i className="fas fa-arrow-down"></i>}
          >
            Show More Products
          </Button>
          <p className="text-gray-400 text-sm">
            Discovering more products for you...
          </p>
        </div>
      )}

      {!isLoading && !hasNextPage && data?.pages[0]?.data.length > 0 && (
        <div className="mt-10 text-center">
          <div className="inline-block p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 font-medium italic">
              "That's all for now! We're constantly adding new products."
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
