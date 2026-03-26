import { buildParams } from "../../helpers/buildParamsHelper";
import api from "./axiosInstance";


export const fetchProducts = async ({ pageParam = 1, queryKey }) => {
  const [, filters] = queryKey;

  const { data } = await api.get("products", {
    params: buildParams(filters, pageParam),
  });

  return {
    data: data.data,
    nextPage: data.data.length === 40 ? pageParam + 1 : null,
  };
};
