import asyncHandler from "express-async-handler";
import Vehicle from "../models/vehicleModel.js";
import Booking from "../models/bookingModel.js";
import { calculateRideDuration } from "../utils/calculateRideDuration.js";
import ApiError from "../utils/apiError.js";

export const addVehicle = asyncHandler(async (req, res) => {
  const { name, capacityKg, tyres } = req.body;

  if (!name || !capacityKg || !tyres) {
    throw new ApiError(400, "All fields are required.");
  }

  const vehicle = await Vehicle.create({ name, capacityKg, tyres });
  res
    .status(201)
    .json({ message: "Vehicle added successfully", data: vehicle });
});

export const getAvailableVehicles = asyncHandler(async (req, res) => {
  const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

  if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
    throw new ApiError(400, "Missing required query params.");
  }

  const start = new Date(startTime);
  if (isNaN(start.getTime())) {
    throw new ApiError(400, "Invalid startTime format.");
  }
  const rideHours = calculateRideDuration(fromPincode, toPincode);
  const end = new Date(start.getTime() + rideHours * 60 * 60 * 1000);

  const vehicles = await Vehicle.find({
    capacityKg: { $gte: Number(capacityRequired) },
  });

  const availableVehicles = [];

  for (const vehicle of vehicles) {
    const conflict = await Booking.findOne({
      vehicleId: vehicle._id,
      startTime: { $lt: end },
      endTime: { $gt: start },
    });
    if (!conflict) {
      availableVehicles.push({
        ...vehicle._doc,
        estimatedRideDurationHours: rideHours,
      });
    }
  }

  res
    .status(200)
    .json({ availableVehicles, estimatedRideDurationHours: rideHours });
});

export const bookVehicle = asyncHandler(async (req, res) => {
  const {
    capacityRequired,
    fromPincode,
    toPincode,
    startTime,
    vehicleId,
    customerId,
  } = req.body;

  if (
    !capacityRequired ||
    !fromPincode ||
    !toPincode ||
    !startTime ||
    !vehicleId ||
    !customerId
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const start = new Date(startTime);
  if (isNaN(start.getTime())) {
    throw new ApiError(400, "Invalid startTime format.");
  }

  const rideHours = calculateRideDuration(fromPincode, toPincode);
  const end = new Date(start.getTime() + rideHours * 60 * 60 * 1000);

  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found.");
  }

  if (vehicle.capacityKg < Number(capacityRequired)) {
    throw new ApiError(400, "Vehicle does not have enough capacity.");
  }

  const existingBooking = await Booking.findOne({
    vehicleId: vehicleId,
    startTime: { $lt: end },
    endTime: { $gt: start },
  });

  if (existingBooking) {
    throw new ApiError(
      409,
      "Vehicle is already booked during this time frame."
    );
  }

  const booking = await Booking.create({
    vehicleId,
    customerId,
    fromPincode,
    toPincode,
    startTime: start,
    endTime: end,
  });

  res.status(201).json({
    message: "Vehicle booked successfully",
    booking,
  });
});

export const getCustomerBookings = asyncHandler(async (req, res) => {
  const { customerId } = req.query;
  if (!customerId) {
    throw new ApiError(400, "Customer ID is required");
  }
  const bookings = await Booking.find({ customerId });
  res.status(200).json({ message: "Bookings fetched", bookings });
});

export const cancelCustomerBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { customerId } = req.query;

  if (!customerId) {
    throw new ApiError(400, "Customer ID is required");
  }

  const booking = await Booking.findOneAndDelete({
    _id: bookingId,
    customerId,
  });

  if (!booking) {
    throw new ApiError(404, "Booking not found or doesn't belong to customer");
  }

  res.status(200).json({ message: "Booking cancelled successfully" });
});
