export const buildParams = (filters, pageParam) => {
  const params = {
    page: pageParam,
    limit: filters.limit || 40,
  };

  if (filters.minPrice) params["price[gte]"] = filters.minPrice;
  if (filters.maxPrice) params["price[lte]"] = filters.maxPrice;
  if (filters.sort) params.sort = filters.sort;

  return params;
};
