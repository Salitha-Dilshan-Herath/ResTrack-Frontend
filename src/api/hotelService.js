// src/api/hotelService.js
import { apiRequest } from "./api";

export const HotelService = {
  getAll: () => apiRequest("/hotel"),
  getById: (id) => apiRequest(`/hotel/${id}`),
  create: (data) => apiRequest("/hotel", "POST", data),
  update: (id, data) => apiRequest(`/hotel/${id}`, "PUT", data),
  delete: (id) => apiRequest(`/hotel/${id}`, "DELETE")
};
