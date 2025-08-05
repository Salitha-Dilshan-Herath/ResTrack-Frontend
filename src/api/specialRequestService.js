import { apiRequest } from "../api/api";

const SpecialRequestService = {
  getAll: () => apiRequest("/specialrequests"),
  getById: (id) => apiRequest(`/specialrequests/${id}`),
  getByBooking: (bookingId) => apiRequest(`/specialrequests/booking/${bookingId}`),
  create: (data) => apiRequest("/specialrequests", "POST", data),
  update: (id, data) => apiRequest(`/specialrequests/${id}`, "PUT", data),
  delete: (id) => apiRequest(`/specialrequests/${id}`, "DELETE")
};

export default SpecialRequestService;
