import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

interface WarrantyQuoteResponse {
  assetId: number;
  quoteAmount: number;
  providerName: string;
  validUntil: string;
}

export default function useWarranty(
  assetId: number | undefined,
  enabled = true
) {
  return useQuery<WarrantyQuoteResponse>({
    queryKey: ["warrantyQuote", assetId],
    queryFn: async () => {
      if (!assetId) throw new Error("Asset ID is required");
      const response = await api.get(`/warranty/get-quote/${assetId}`);
      return response.data;
    },
    enabled: enabled && !!assetId,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });
}
