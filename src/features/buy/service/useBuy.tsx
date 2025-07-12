import { product, buy } from "@/shared/keys";
import { api } from "@/shared/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const useBuy = () => {
  const queryClient = useQueryClient();

  const createBuy = useMutation({
    mutationFn: (body: any) =>
      api.post("buy", body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [product]});
      queryClient.invalidateQueries({ queryKey: [buy] });
    },
  });

  return { createBuy };
};
