import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import type { Asset } from "../interfaces/Asset";
interface AssetsTableProps {
  assets: Asset[];
}

export const AssetsTable = ({ assets }: AssetsTableProps) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Purchase Date</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map((asset) => (
          <TableRow
            onClick={() => {
              navigate(`/dashboard/assets/${asset.id}`);
            }}
            key={asset.id}
            className="hover:bg-muted cursor-pointer"
          >
            <TableCell>
              {asset.name} + {asset.id}
            </TableCell>
            <TableCell>{asset.category}</TableCell>
            <TableCell>
              {dayjs(asset.createdAt).format("DD/MM/YYYY HH:mm")}
            </TableCell>
            <TableCell>
              {dayjs(asset.purchaseDate).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell className="text-right font-semibold">
              ${asset.value.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
