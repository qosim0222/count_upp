import { api } from "@/shared/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface IParams {
    page?: string,
    limit?: string,
    search?: string,
    role: string,
    isActive?: string,
    sortBy?: string,
    sortOrder?: "asc" | "desc",
    debtOnly?: string
}

export const usePartner = () => {
  const queryClient = useQueryClient();
  const key = "partner";

  const getPartners = (params:IParams) =>
    useQuery({
      queryKey: [key, params],
      queryFn: () => api.get("partners", {params}).then((res) => res.data),
    });
  
  const createPartner = useMutation({
    mutationFn: (body:any)=> api.post("partners", body).then(res => res.data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: [key]})
    }
  })

  return { getPartners, createPartner };
};
