export interface Asset {
  id: number;
  name: string;
  category: string;
  purchaseDate: string; // ISO string
  value: number;
  userId?: number;
  createdAt: string;
}
