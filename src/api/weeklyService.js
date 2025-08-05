
import { apiRequestRaw } from "./api";

export const WeeklyService = {
  async getWeeklyReport() {
    const responseText = await apiRequestRaw("/Booking/weeklyreport", "GET", null, "text");

    const parser = new DOMParser();
    const xml = parser.parseFromString(responseText, "application/xml");

    const startDate = xml.querySelector("StartDate")?.textContent;
    const endDate = xml.querySelector("EndDate")?.textContent;

    const bookings = Array.from(xml.getElementsByTagName("Booking")).map(b => ({
      id: b.querySelector("Id")?.textContent,
      customerName: b.querySelector("CustomerName")?.textContent,
      checkInDate: b.querySelector("CheckInDate")?.textContent,
      checkOutDate: b.querySelector("CheckOutDate")?.textContent,
      hotelId: b.querySelector("HotelId")?.textContent,
      roomId: b.querySelector("RoomId")?.textContent,
      isRecurring: b.querySelector("IsRecurring")?.textContent === "true",
      specialRequests: Array.from(b.getElementsByTagName("Request")).map(r => r.textContent),
    }));

    return { startDate, endDate, bookings };
  }
};
