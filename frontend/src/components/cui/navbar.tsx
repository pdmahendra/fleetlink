import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow px-6 py-4 relative z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          FleetLink
        </Link>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden md:flex space-x-4">
          <Button asChild variant="ghost">
            <Link to="/">Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/add-vehicle">Add Vehicle</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/book-vehicle">Book Vehicle</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/all-bookings">All Bookings</Link>
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-white shadow-md flex flex-col space-y-2 px-6 py-4 md:hidden">
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/add-vehicle" onClick={() => setMenuOpen(false)}>
              Add Vehicle
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/book-vehicle" onClick={() => setMenuOpen(false)}>
              Book Vehicle
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/all-bookings" onClick={() => setMenuOpen(false)}>
              All Bookings
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
