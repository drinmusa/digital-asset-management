import { useEffect, useState } from "react";
import useWarranties from "../../hooks/useWarranties";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
// Assuming you have a WarrantiesTable component similar to AssetsTable
import { WarrantyTable } from "../../components/WarrantyTable";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
export default function WarrantyPage() {
  const [page, setPage] = useState(1);
  const { role } = useAuthStore();
  const navigate = useNavigate();
  const limit = 10;
  useEffect(() => {
    if (role !== "ADMIN") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);
  const { data, isLoading, isError, error, isFetching } = useWarranties(
    page,
    limit
  );

  if (isLoading)
    return (
      <div className="flex justify-center py-10 text-muted-foreground">
        Loading warranties...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center py-10 text-destructive">
        Error: {(error as Error).message}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Warranty Quotes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data?.warranties?.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No warranty quotes found.
            </p>
          ) : (
            <ScrollArea className="h-96">
              <WarrantyTable warranties={data?.warranties || []} />
            </ScrollArea>
          )}

          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1 || isFetching}
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {page} {isFetching ? "(Loading...)" : ""}
            </span>

            <Button
              variant="outline"
              onClick={() => setPage((old) => (data?.hasMore ? old + 1 : old))}
              disabled={!data?.hasMore || isFetching}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
