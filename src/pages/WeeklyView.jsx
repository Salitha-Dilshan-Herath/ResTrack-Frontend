import { useEffect, useState } from "react";
import { format, eachDayOfInterval } from "date-fns";
import { WeeklyService } from "../api/weeklyService";
import { HotelService } from "../api/hotelService";
import { RoomService } from "../api/roomService";
import { Link } from "react-router-dom";

export default function WeeklyView() {
  const [bookings, setBookings] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const { startDate, endDate, bookings } = await WeeklyService.getWeeklyReport();

        const hotelIds = [...new Set(bookings.map(b => b.hotelId))];

        const hotelMap = {};
        await Promise.all(hotelIds.map(async id => {
          try {
            const hotel = await HotelService.getHotelById(id);
            hotelMap[id] = hotel.name;
          } catch {
            hotelMap[id] = `Hotel #${id}`;
          }
        }));

        const roomMap = {};
        await Promise.all(hotelIds.map(async hotelId => {
          try {
            const rooms = await RoomService.getRoomsByHotelId(hotelId);
            rooms.forEach(room => {
              roomMap[room.id] = {
                type: room.roomType || "Unknown"
              };
            });
          } catch {
            // fallback
          }
        }));

        const enriched = bookings.map(b => ({
          ...b,
          hotelName: hotelMap[b.hotelId] || `Hotel #${b.hotelId}`,
          roomName: roomMap[b.roomId]?.name || `Room #${b.roomId}`,
          roomType: roomMap[b.roomId]?.type || "Unknown"
        }));

        const start = new Date(startDate);
        const end = new Date(endDate);

        setStartDate(start);
        setEndDate(end);
        setDays(eachDayOfInterval({ start, end }));
        setBookings(enriched);
      } catch (err) {
        console.error("Failed to load weekly view:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);

  const isDateBetween = (date, start, end) => {
    const d = new Date(date);
    return d >= new Date(start) && d < new Date(end);
  };

  if (loading) return <div className="text-center p-6">Loading weekly bookings...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Weekly Booking View ({format(startDate, "dd/MM/yyyy")} - {format(endDate, "dd/MM/yyyy")})
      </h2>

      <table className="table-auto w-full border-collapse border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Hotel</th>
            <th className="border p-2">Room Type</th>
            {days.map((d, i) => (
              <th key={i} className="border p-2 text-xs">{format(d, "EEE dd")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={i}>
              <td className="border p-2">{b.hotelName}</td>
              <td className="border p-2">{b.roomType}</td>
              {days.map((d, idx) => {
                const inRange = isDateBetween(d, b.checkInDate, b.checkOutDate);
                return (
                  <td key={idx} className="border p-1 text-center align-top">
                    {inRange && (
                      <div className="bg-blue-600 text-white rounded p-1">
                        <div className="font-semibold">{b.customerName}</div>
                        {b.specialRequests?.[0] && (
                          <div className="text-xs italic">{b.specialRequests[0]}</div>
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <Link to="/bookings" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
          Back to Bookings
        </Link>
      </div>
    </div>
  );
}
