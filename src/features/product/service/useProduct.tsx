import { product } from "@/shared/keys";
import { api } from "@/shared/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface IParams {
  page?: string;
  limit?: string;
  name?: string;
}

export const useProduct = () => {
  const queryClient = useQueryClient();

  const getSearchProducts = (params: IParams) =>
    useQuery({
      queryKey: [product, params],
      queryFn: () => api.get("product", { params }).then((res) => res.data),
      enabled: !!params.name,
    });
  const getProducts = (params: IParams) =>
    useQuery({
      queryKey: [product, params],
      queryFn: () => api.get("product", { params }).then((res) => res.data),
    });

  const createProduct = useMutation({
    mutationFn: (body: any) =>
      api.post("product", body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [product] });
    },
  });

  return { getProducts, getSearchProducts,createProduct };
};
