// src/api/hotelService.js
import { apiRequest } from "./api";

export const HotelService = {
  async getAllHotels() {
    return apiRequest("/Hotel", "GET");
  },

   async getHotelById(hotelId) {
    return apiRequest(`/Hotel/${hotelId}`, "GET");
  },
  
  // Example: addHotel, updateHotel, deleteHotel, etc.
  // async addHotel(data) {
  //   return apiRequest("/Hotel", "POST", data);
  // }
};
