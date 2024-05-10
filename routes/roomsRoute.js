const express = require("express");
const roomsController = require("../controllers/roomsController");

const router = express.Router();

router.post('/api/hotels/:hotelId/rooms/create', roomsController.createRoom);
router.put('/api/hotels/:hotelId/rooms/updateAvailability', roomsController.updateRoomAvailability);
router.get('/api/hotels/:hotelId/rooms', roomsController.getAllRoomsForHotel);
router.get('/api/rooms/:roomId', roomsController.getRoomDetails);
router.delete('/api/rooms/:roomId', roomsController.deleteRoom);

module.exports = router;
