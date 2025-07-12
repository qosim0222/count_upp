import { partner, product, sell } from "@/shared/keys";
import { api } from "@/shared/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useSell = () => {
  const queryClient = useQueryClient();

  const createSell = useMutation({
    mutationFn: (body: any) =>
      api.post("contract", body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [sell] });
      queryClient.invalidateQueries({ queryKey: [product] });
      queryClient.invalidateQueries({ queryKey: [partner] });
    },
  });

  return { createSell };
};
