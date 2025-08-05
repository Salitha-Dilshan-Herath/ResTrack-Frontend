import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Bookings from "./pages/booking/Bookings";
import SelectHotel from "./pages/booking/SelectHotel";
import CreateBooking from "./pages/booking/CreateBooking";
import EditBooking from "./pages/booking/EditBooking";
import ConfirmDelete from "./pages/booking/ConfirmDelete";
import WeeklyView from "./pages/WeeklyView";
import SpecialRequests from "./pages/specialRequest/SpecialRequests";
import CreateSpecialRequest from "./pages/specialRequest/CreateSpecialRequest";
import SpecialConfirmDelete from "./pages/specialRequest/ConfirmDelete";
function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookings/new" element={<SelectHotel />} />
        <Route path="/bookings/new/:hotelId" element={<CreateBooking />} />
        <Route path="/bookings/edit/:bookingId" element={<EditBooking />} />
        <Route path="/bookings/delete/:bookingId" element={<ConfirmDelete />} />
        <Route path="/weekly-view" element={<WeeklyView />} />

        <Route path="/special-requests" element={<SpecialRequests />} />
        <Route path="/special-requests/new" element={<CreateSpecialRequest />} />
        <Route path="/special-requests/edit/:id" element={<CreateSpecialRequest />} />
        <Route path="/special-requests/delete/:id" element={<SpecialConfirmDelete />} />
      </Routes>
    </Router>
  );
}


export default App;
