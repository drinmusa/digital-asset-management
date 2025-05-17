import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import useAsset from "../../hooks/useAsset";
import useWarranty from "../../hooks/useWarranty";

export default function AssetDetailsPage() {
  const { id } = useParams<{ id: string }>();

  // Fetch asset data as before
  const { data: asset, isLoading, isError, error } = useAsset(Number(id));

  // Fetch warranty only when triggered manually (enabled: false)
  const {
    data: warranty,
    isFetching: isWarrantyLoading,
    refetch: fetchWarranty,
    error: warrantyError,
    isError: isWarrantyError,
  } = useWarranty(Number(id), false);

  if (isLoading)
    return (
      <p className="text-center py-10 text-muted-foreground">Loading...</p>
    );

  if (isError)
    return (
      <p className="text-center py-10 text-destructive">
        Error: {(error as Error).message}
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Asset Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {asset?.name}
          </p>
          <p>
            <strong>Category:</strong> {asset?.category}
          </p>
          <p>
            <strong>Purchase Date:</strong>{" "}
            {dayjs(asset?.purchaseDate).format("DD/MM/YYYY")}
          </p>
          <p>
            <strong>Value:</strong> ${asset?.value.toFixed(2)}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {dayjs(asset?.createdAt).format("DD/MM/YYYY HH:mm")}
          </p>

          <Button
            className="mt-6"
            onClick={() => fetchWarranty()}
            disabled={isWarrantyLoading}
          >
            {isWarrantyLoading ? "Requesting..." : "Request Warranty Quote"}
          </Button>

          {isWarrantyError && (
            <p className="text-destructive mt-4">
              Error fetching warranty quote: {(warrantyError as Error)?.message}
            </p>
          )}

          {warranty && (
            <div className="mt-6 p-4 border rounded bg-green-50">
              <h3 className="font-semibold mb-2">Warranty Quote:</h3>
              <p>
                <strong>Provider:</strong> {warranty.providerName}
              </p>
              <p>
                <strong>Quote Amount:</strong> $
                {warranty.quoteAmount.toFixed(2)}
              </p>
              <p>
                <strong>Valid Until:</strong>{" "}
                {dayjs(warranty.validUntil).format("DD/MM/YYYY")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
