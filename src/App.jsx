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
import HotelList from "./pages/hotel/HotelList";
import HotelForm from "./pages/hotel/HotelForm";
import HotelDelete from "./pages/hotel/HotelDelete";
import RoomList from "./pages/room/RoomList";
import RoomForm from "./pages/room/RoomForm";
import RoomDelete from "./pages/room/RoomDelete";

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

        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/new" element={<HotelForm />} />
        <Route path="/hotels/edit/:id" element={<HotelForm />} />
        <Route path="/hotels/delete/:id" element={<HotelDelete />} />

        <Route path="/rooms" element={<RoomList />} />
        <Route path="/rooms/new/:hotelId" element={<RoomForm />} />
        <Route path="/rooms/edit/:id" element={<RoomForm />} />
        <Route path="/rooms/delete/:id" element={<RoomDelete />} />
      </Routes>
    </Router>
  );
}


export default App;
