import { apiRequest } from "./api";

export const BookingService = {
    getAllBookings: () => apiRequest("/Booking", "GET"),

    createBooking: (data) => apiRequest("/Booking", "POST", data),

    updateBooking: (id, data) => apiRequest(`/Booking/${id}`, "PUT", data),

    getBookingById: (id, data) => apiRequest(`/Booking/${id}`, "GET", data),

    deleteBooking: (id) => apiRequest(`/Booking/${id}`, "DELETE"),

};
