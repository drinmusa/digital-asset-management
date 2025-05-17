import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

import type { Asset } from "../interfaces/Asset";

interface AssetsResponse {
  assets: Asset[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export default function useAssets(page: number, limit: number) {
  return useQuery<AssetsResponse>({
    queryKey: ["assets", page, limit],
    queryFn: async () => {
      const response = await api.get("/assets", {
        params: { page, limit },
      });

      const resData = response.data;

      return {
        assets: resData.data,
        total: resData.pagination.total,
        page: resData.pagination.page,
        pageSize: resData.pagination.limit,
        hasMore: resData.pagination.page < resData.pagination.pages,
      };
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });
}
