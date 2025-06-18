import axiosInstance from "@/lib/api";
import type {
  AddVehicleProps,
  Booking,
  GetAvailableVehicleParams,
} from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const addVehicle = async (data: AddVehicleProps) => {
  const result = await axiosInstance.post("/addVehicle", data);
  return result.data;
};

export const getAvailableVehicles = async (
  params: GetAvailableVehicleParams
) => {
  const result = await axiosInstance.get("/available-vehicles", { params });
  return result.data;
};

export const bookVehicle = async (data: any) => {
  const result = await axiosInstance.post("/book-vehicle", data);
  return result.data;
};

export const fetchBookings = async (customerId: string): Promise<Booking[]> => {
  const res = await axiosInstance.get("/get-bookings", {
    params: { customerId },
  });
  return res.data.bookings;
};

export const deleteBooking = async (
  bookingId: string,
  customerId: string
): Promise<any> => {
  const res = await axiosInstance.delete(`/cancel-booking/${bookingId}`, {
    params: { customerId },
  });
  return res.data;
};

export const useAddVehicle = () =>
  useMutation({
    mutationFn: addVehicle,
  });

export const useBookVehicle = () =>
  useMutation({
    mutationFn: bookVehicle,
  });

export const useGetAvailableVehicles = (params: GetAvailableVehicleParams) =>
  useQuery({
    queryKey: ["availableVehicles", params],
    queryFn: () => getAvailableVehicles(params),
    enabled: false,
  });

export const useBookings = (customerId: string) =>
  useQuery({
    queryKey: ["bookings", customerId],
    queryFn: () => fetchBookings(customerId),
  });

export const useCancelBooking = (customerId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: string) => deleteBooking(bookingId, customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
