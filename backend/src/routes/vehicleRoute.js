import { Router } from "express";
import {
  addVehicle,
  getAvailableVehicles,
  bookVehicle,
  getCustomerBookings,
  cancelCustomerBooking,
} from "../controllers/vehicleController.js";

const router = Router();

router.post("/addVehicle", addVehicle);
router.get("/available-vehicles", getAvailableVehicles);
router.get("/get-bookings", getCustomerBookings);
router.post("/book-vehicle", bookVehicle);
router.delete("/cancel-booking/:bookingId", cancelCustomerBooking);

export default router;
