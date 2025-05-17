export interface Warranty {
  id: number;
  assetId: number;
  quoteAmount: number;
  providerName: string;
  validUntil: string; // ISO string
  createdAt: string; // ISO string
}
