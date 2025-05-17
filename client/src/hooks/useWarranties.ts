import type { Warranty } from "./../interfaces/Warranty";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

interface WarrantiesResponse {
  warranties: Warranty[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export default function useWarranties(page: number, limit: number) {
  return useQuery<WarrantiesResponse>({
    queryKey: ["warranties", page, limit],
    queryFn: async () => {
      const response = await api.get("/warranty", {
        params: { page, limit },
      });

      const resData = response.data;

      return {
        warranties: resData.data,
        total: resData.pagination.total,
        page: resData.pagination.page,
        pageSize: resData.pagination.limit,
        hasMore: resData.pagination.page < resData.pagination.pages,
      };
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });
}
