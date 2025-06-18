import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { Booking } from "@/lib/types";

interface BookingCardProps {
  booking: Booking;
  isCancelling: boolean;
  onCancel: (id: string) => void;
}

export const BookingCard = ({
  booking,
  isCancelling,
  onCancel,
}: BookingCardProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">
            Booking ID:{" "}
            <span className="text-muted-foreground">
              {booking._id.slice(-6)}
            </span>
          </CardTitle>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onCancel(booking._id)}
            disabled={isCancelling}
          >
            {isCancelling ? (
              <div className="flex items-center gap-2">
                Cancelling <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              "Cancel"
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
        <div className="space-y-1">
          <p>
            <strong className="text-foreground">From:</strong>{" "}
            {booking.fromPincode}
          </p>
          <p>
            <strong className="text-foreground">To:</strong> {booking.toPincode}
          </p>
          <p>
            <strong className="text-foreground">Start Time:</strong>{" "}
            {new Date(booking.startTime).toLocaleString()}
          </p>
        </div>

        <div className="space-y-1">
          <p>
            <strong className="text-foreground">Capacity:</strong>{" "}
            {booking.capacityRequired} kg
          </p>
          <p>
            <strong className="text-foreground">Vehicle ID:</strong>{" "}
            {booking.vehicleId.slice(-6)}
          </p>
          <p>
            <strong className="text-foreground">Customer ID:</strong>{" "}
            {booking.customerId}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
