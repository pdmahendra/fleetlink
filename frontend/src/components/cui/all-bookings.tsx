import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useBookings, useCancelBooking } from "@/api/vehicle-api";
import Lottie from "lottie-react";
import empty from "../../../public/empty.json";
import { BookingCard } from "./booking-card";
import { useState } from "react";

const AllBookings = () => {
  const customerId = "1";
  const { data: bookings, isLoading } = useBookings(customerId);
  const { mutate: cancelBooking } = useCancelBooking(customerId);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleCancel = (id: string) => {
    setCancellingId(id);
    cancelBooking(id, {
      onSuccess: () => {
        toast("Booking cancelled");
        setCancellingId(null);
      },
      onError: () => {
        toast.error("Failed to cancel booking");
        setCancellingId(null);
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Bookings</h1>

      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin h-4 w-4" /> Loading bookings...
        </div>
      ) : bookings?.length === 0 ? (
        <div className="flex justify-center items-center h-[80vh]">
          <div className="flex flex-col justify-center items-center">
            <Lottie
              animationData={empty}
              loop
              autoplay
              style={{ height: "250px", width: "250px" }}
            />
            <p>No Bookings Found</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings?.map((b) => (
            <BookingCard
              key={b._id}
              booking={b}
              isCancelling={cancellingId === b._id}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBookings;
