// src/api/roomService.js
import { apiRequest } from "./api";

export const RoomService = {

  getByHotelId: async (hotelId) => {return apiRequest(`/rooms/hotel/${hotelId}`, "GET");},
  getById: async (id) => apiRequest(`/rooms/${id}`, "GET"),
  create: async (room) => apiRequest("/rooms", "POST", room),
  update: async (id, room) => apiRequest(`/rooms/${id}`, "PUT", room),
  delete: async (id) => apiRequest(`/rooms/${id}`, "DELETE"),
};
