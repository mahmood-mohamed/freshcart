import { useEffect, useState } from "react";
import { Skeleton } from "@heroui/react";
import MainSlider from "../../components/MainSlider/MainSlider";
import useFetch from "../../hooks/useFetch";

export default function Brands() {
    const [page, setPage] = useState(1);  // Current page
    const [brands, setBrands] = useState([]);
    const { data: newBrands, error, isLoading, isFetching } = useFetch("brands", page); // Custom hook to fetch all brands



    useEffect(() => { 
      if (newBrands) {
        setBrands((prevBrands) => {
          const uniqueBrands = [...prevBrands, ...newBrands].filter(
            (brand, index, self) => 
              index === self.findIndex((b) => b._id === brand._id) // To Prevent Repeating data
          );
          return uniqueBrands;
        });
      }
    }, [newBrands]);

    if(isLoading && page === 1) {
      return (
        <div className="container mx-auto px-4 py-12">
          <MainSlider data={null} />
          <div className="text-center my-6 mt-12">
            <Skeleton className="w-48 h-8 rounded-lg mx-auto">
              <div className="w-full h-full bg-default-300"></div>
            </Skeleton>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-zinc-100 w-32 h-32 flex flex-col items-center justify-center border border-blue-100 rounded-lg shadow-md overflow-hidden"
              >
                <Skeleton className="w-full h-full rounded-none" />
                <div className="py-2 flex justify-center w-full">
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if(error) {
      return <div className="text-center text-xl font-semibold text-red-500">Error loading Brands {error.message}</div>;
    }
  return (
    <div className="container mx-auto px-4 py-12">
      <MainSlider data={brands}  />
      <h2 className="text-2xl font-bold text-center my-6 mt-12">Product Brands</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {brands?.map((brand) => (
          <div
            key={brand._id}
            className="bg-zinc-100 w-32 h-32 flex flex-col items-center justify-center border border-blue-100 rounded-lg shadow-md overflow-hidden"
          >
            <img src={brand.image} alt={brand.name} className="w-full h-full object-cover" />
            <div className="py-2 text-center">
              <h3 className="text-slate-900 text-md font-medium">{brand.name}</h3>
            </div>
          </div>
        ))}
      </div>
    
      {page === 1 &&(<div className="flex justify-center mt-6">
          <button
            onClick={() => setPage(2)}
            className="text-blue-500 bg-transparent px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Show More"}
          </button>
        </div>)
      }
    </div>
  )
}
