import { useState } from "react";
import useAssets from "../../hooks/useAssets";
import { Button } from "../../components/ui/button";
// import dayjs from "dayjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { AssetsTable } from "../../components/AssetsTable";

export default function AssetsPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const limit = 10;
  const redirectToNewAsset = () => {
    navigate("/dashboard/assets/new");
  };
  const { data, isLoading, isError, error, isFetching } = useAssets(
    page,
    limit
  );

  if (isLoading)
    return (
      <div className="flex justify-center py-10 text-muted-foreground">
        Loading assets...
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
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">Assets List</CardTitle>
          <Button
            onClick={redirectToNewAsset}
            className="text-xl font-semibold"
          >
            New Asset
          </Button>
        </CardHeader>
        <CardContent>
          {data?.assets?.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No assets found.
            </p>
          ) : (
            <ScrollArea className="h-96">
              <AssetsTable assets={data?.assets || []} />
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
