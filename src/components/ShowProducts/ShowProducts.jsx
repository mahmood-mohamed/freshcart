import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@heroui/react";
import LoadingScreen from "./../LoadingScreens/LoadingScreen";
import Product from "../Product/Product";

const fetchProducts = async ({ pageParam = 1 }) => {
  const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
    params: { page: pageParam, limit: 40 }
  });
  return { data: data.data, nextPage: data.data.length === 40 ? pageParam + 1 : null };
};

export default function ShowProducts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <p>Products are loading...</p>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <section className="">
      {error && (
        <div className="my-4 p-4 bg-red-100 text-red-700 rounded-lg">
          Failed to load products. Please try again. 😔😔
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.pages.map((page) =>
          page.data.map((product) => <Product key={product.id} product={product} />)
        )}
      </div>

      {!error && (
        <div className="mt-8 flex justify-center">
          {hasNextPage ? (
            <Button
              onPress={() => fetchNextPage()}
              variant="outline"
              color="blue"
              className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all px-6 py-2 rounded-lg"
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </Button>
          ) : (
            <p className="text-gray-500">No more products to show</p>
          )}
        </div>
      )}
    </section>
  );
}
