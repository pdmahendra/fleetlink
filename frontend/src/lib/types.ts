export interface AddVehicleProps {
  name: String;
  capacityKg: Number;
  tyres: Number;
}

export interface GetAvailableVehicleParams {
  fromPincode: string;
  toPincode: string;
  startTime: string;
  capacityRequired: string;
}

export interface Vehicle {
  _id: string;
  name: string;
  capacityKg: number;
  tyres: number;
  estimatedRideDurationHours: number;
  createdAt: string
  updatedAt: string;
  __v: number;
}

export interface Booking {
  _id: string;
  customerId: string;
  fromPincode: string;
  toPincode: string;
  startTime: string;
  capacityRequired: number;
  vehicleId: string;
  createdAt: string;
}
