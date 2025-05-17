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
import type { Warranty } from "../interfaces/Warranty";

interface WarrantiesTableProps {
  warranties: Warranty[];
}

export const WarrantyTable = ({ warranties }: WarrantiesTableProps) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Quote ID</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Expiry Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {warranties.map((warranty) => (
          <TableRow
            key={warranty.id}
            className="hover:bg-muted cursor-pointer"
            onClick={() => navigate(`/dashboard/warranties/${warranty.id}`)}
          >
            <TableCell>{warranty.id}</TableCell>
            <TableCell>{warranty.quoteAmount}</TableCell>
            <TableCell>{warranty.providerName}</TableCell>
            <TableCell>
              {dayjs(warranty.validUntil).format("DD/MM/YYYY")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
