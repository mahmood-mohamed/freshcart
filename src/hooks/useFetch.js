import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetch(endPoint, page=1) {

    function fetchData() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}?page=${page}`);
      }
    
      const { data, error, isLoading, isFetching } = useQuery({
        queryKey: [endPoint, page],
        queryFn: () => fetchData(endPoint),
        select: (res) => res.data.data,
        keepPreviousData: true,
        gcTime: 60000, // Remove stale data after 1 minute from the cache
        staleTime: 5000,  // Refresh data every 5 seconds
      });


  return {data, error, isLoading, isFetching}
}
