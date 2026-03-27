export const buildParams = (filters, pageParam) => {
  const params = {
    page: pageParam,
    limit: filters.limit || 40,
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
