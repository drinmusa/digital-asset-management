import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import useCreateAsset from "../../hooks/useCreateAsset";
export default function NewAssetPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    purchaseDate: "",
    value: "",
  });
  const navigate = useNavigate();
  const createAsset = useCreateAsset();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleCategoryChange = (value: string) => {
    setForm((prev) => ({ ...prev, category: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAsset.mutate(
      {
        ...form,
        value: Number(form.value),
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          navigate("/dashboard/assets");
        },
        onError: () => {
          toast.error("Failed to create asset");
        },
      }
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg space-y-6 bg-white">
      <h2 className="text-2xl font-semibold">Create New Asset</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={form.category} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="watches">Watches</SelectItem>
              <SelectItem value="cars">Cars</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="purchaseDate">Purchase Date</Label>
          <Input
            type="date"
            name="purchaseDate"
            value={form.purchaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="value">Value</Label>
          <Input
            type="number"
            name="value"
            value={form.value}
            onChange={handleChange}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={createAsset.isPending}
        >
          {createAsset.isPending ? "Creating..." : "Create Asset"}
        </Button>
      </form>
    </div>
  );
}
