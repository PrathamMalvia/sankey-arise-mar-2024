const express = require("express");
const hotelController = require("../controllers/hotelsController");

const router = express.Router();

router.post("/api/hotels", hotelController.createHotel);
router.get("/api/hotels", hotelController.getHotels);
router.get("/api/hotelsByCity", hotelController.countHotelsByCity);
router.get("/api/hotelsByType", hotelController.countHotelsByType);
router.get("/api/hotels/:hotelId/rooms", hotelController.getHotelRooms);

module.exports = router;
