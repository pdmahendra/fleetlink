import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/cui/form-input";
import { toast } from "sonner";
import { useBookVehicle, useGetAvailableVehicles } from "@/api/vehicle-api";
import type { Vehicle } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { bookingSchema } from "@/lib/schema";

const BookVehicle = () => {
  const [formData, setFormData] = useState({
    fromPincode: "",
    toPincode: "",
    startTime: "",
    capacityRequired: "",
  });
  const { data, refetch } = useGetAvailableVehicles(formData);
  const { mutate: bookVehicleMutation } = useBookVehicle();
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await refetch();
    if (result?.data?.availableVehicles?.length === 0) {
      toast("No Vehicle Found");
    } else {
      toast("Available Vehicle Fetched Successfully");
    }
  };

  const handleBook = (vehicleId: string) => {
    const result = bookingSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        fromPincode: fieldErrors.fromPincode?.[0],
        toPincode: fieldErrors.fromPincode?.[0],
        startTime: fieldErrors.fromPincode?.[0],
        capacityRequired: fieldErrors.fromPincode?.[0],
      });
      return;
    }
    setBookingId(vehicleId);

    bookVehicleMutation(
      {
        ...formData,
        startTime: new Date(formData.startTime).toISOString(),
        vehicleId,
        customerId: "1",
      },
      {
        onSuccess: (res) => {
          toast(res.message || "Vehicle Booked Successfully");
          refetch();
          setBookingId(null);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Something went wrong");
          setBookingId(null);
        },
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Book a Vehicle</h1>

      <form onSubmit={handleSearch} className="space-y-4">
        <FormInput
          name="fromPincode"
          title="From Pincode"
          value={formData.fromPincode}
          onChange={handleChange}
          error={errors.fromPincode}
          required
        />
        <FormInput
          name="toPincode"
          title="To Pincode"
          value={formData.toPincode}
          onChange={handleChange}
          error={errors.toPincode}
          required
        />
        <FormInput
          name="startTime"
          title="Start Time"
          type="datetime-local"
          value={formData.startTime}
          onChange={handleChange}
          error={errors.startTime}
          required
        />
        <FormInput
          name="capacityRequired"
          title="Required Capacity (kg)"
          type="number"
          value={formData.capacityRequired}
          onChange={handleChange}
          error={errors.capacityRequired}
          required
        />
        <Button type="submit" className="w-full">
          Search Vehicles
        </Button>
      </form>

      {data?.availableVehicles?.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-semibold">Available Vehicles</h2>
          {data?.availableVehicles?.map((v: Vehicle) => (
            <div
              key={v._id}
              className="border p-4 rounded-lg shadow flex justify-between items-start"
            >
              <div>
                <p>
                  <strong>Name:</strong> {v.name}
                </p>
                <p>
                  <strong>Capacity:</strong> {v.capacityKg} kg
                </p>
                <p>
                  <strong>Tyres:</strong> {v.tyres}
                </p>
                <p>
                  <strong>Estimated Duration:</strong>{" "}
                  {v.estimatedRideDurationHours} hrs
                </p>
              </div>
              <Button
                onClick={() => handleBook(v._id)}
                disabled={bookingId === v._id}
              >
                {bookingId === v._id ? (
                  <div className="flex items-center gap-2">
                    Booking <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  "Book Now"
                )}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookVehicle;
