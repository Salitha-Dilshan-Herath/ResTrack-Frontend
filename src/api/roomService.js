// src/api/roomService.js
import { apiRequest } from "./api";

export const RoomService = {
  async getRoomsByHotelId(hotelId) {
    return apiRequest(`/rooms/hotel/${hotelId}`, "GET");
  },
};
