import { z } from "zod";

export const addVehicle = z.object({
  name: z.string().min(1, "Vehicle name is required"),
  capacityKg: z
    .string({ invalid_type_error: "Capacity is required" })
    .transform((val) => Number(val)),
  tyres: z
    .string({ invalid_type_error: "Tyres is required" })
    .transform((val) => Number(val)),
});

export type VehicleForm = z.infer<typeof addVehicle>;

export const bookingSchema = z.object({
  fromPincode: z
    .string()
    .min(5, "From Pincode must be at least 5 digits")
    .max(6, "From Pincode must be at most 6 digits")
    .regex(/^\d+$/, "From Pincode must be numeric"),
  toPincode: z
    .string()
    .min(5, "To Pincode must be at least 5 digits")
    .max(6, "To Pincode must be at most 6 digits")
    .regex(/^\d+$/, "To Pincode must be numeric"),
  startTime: z
    .string()
    .min(1, "Start Time is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Start Time must be a valid date",
    }),
  capacityRequired: z
    .string()
    .min(1, "Capacity is required")
    .regex(/^\d+$/, "Capacity must be numeric"),
});
