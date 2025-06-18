
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome to FleetLink</h1>
      <p className="text-muted-foreground mb-8">
        A logistics vehicle booking platform to manage fleet availability and
        vehicle assignments in real time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <CardTitle>Add a Vehicle</CardTitle>
            <CardDescription className="mb-4">
              Register a new vehicle with capacity and tyre details.
            </CardDescription>
            <Button asChild>
              <Link to="/add-vehicle">Go to Add Vehicle</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <CardTitle>Book a Vehicle</CardTitle>
            <CardDescription className="mb-4">
              Search for available vehicles and make a booking.
            </CardDescription>
            <Button asChild>
              <Link to="/book-vehicle">Go to Booking</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
