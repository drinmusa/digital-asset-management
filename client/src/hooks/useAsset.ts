import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

import type { Asset } from "../interfaces/Asset";

export default function useAsset(id: number | undefined) {
  return useQuery<Asset>({
    queryKey: ["asset", id],
    queryFn: async () => {
      if (!id) throw new Error("Asset ID is required");
      const response = await api.get(`/assets/${id}`);
      return response.data.data;
    },
    enabled: !!id, // only run if id is defined
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });
}
