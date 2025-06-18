import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Home from "./components/cui/home";
import AddVehicle from "./components/cui/add-vehicle";
import AllBookings from "./components/cui/all-bookings";
import BookVehicle from "./components/cui/book-vehicle";
import Footer from "./components/cui/footer";
import Navbar from "./components/cui/navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
            <Route path="/book-vehicle" element={<BookVehicle />} />
            <Route path="/all-bookings" element={<AllBookings />} />
          </Routes>
        </main>

        <Toaster />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
