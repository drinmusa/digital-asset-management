import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/axios";
import type { Asset } from "../interfaces/Asset";

interface CreateAssetResponse {
  message: string;
  asset: Asset;
}
export default function useCreateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      newAsset: Omit<Asset, "id" | "userId" | "createdAt">
    ) => {
      const response = await api.post<CreateAssetResponse>("/assets", newAsset);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
}
