/**
 * Builds query parameters for API requests based on filters and pagination.
 * @param {Object} filters - The filters to apply to the query.
 * @param {number} pageParam - The page number for pagination.
 * @returns {Object} The query parameters.
 */
const [filters, setFilters] = useState({
  keyword: "",
  minPrice: "",
  maxPrice: "",
  category: [],
  brand: "",
  sort: "",
});
export const buildParams = (filters, pageParam) => {
  const params = {
    page: pageParam,
    limit: 40,
  };

  if (filters.keyword) params.keyword = filters.keyword;
  if (filters.minPrice) params["price[gte]"] = filters.minPrice;
  if (filters.maxPrice) params["price[lte]"] = filters.maxPrice;
  if (filters.brand) params.brand = filters.brand;
  if (filters.sort) params.sort = filters.sort;

  if (filters.category?.length) {
    params["category[in]"] = filters.category;
  }

  return params;
};
