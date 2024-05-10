const expressAsyncHandler = require("express-async-handler");
const Hotel = require("../models/hotelModel");
const Room = require("../models/roomModel");

const roomsController = {
    createRoom: expressAsyncHandler(async (req, res) => {
        const hotelId = req.params.hotelId;
        const newRoom = new Room(req.body);

        try {
            // Save the new room
            const savedRoom = await newRoom.save();

            // Update hotel's rooms array with the new room ID
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });

            res.status(201).json(savedRoom);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    updateRoomAvailability: expressAsyncHandler(async (req, res) => {
        const hotelId = req.params.hotelId;
        const roomId = req.body.roomId;
        const dates = req.body.dates;

        try {
            // Update room's unavailableDates array with new dates
            await Room.findByIdAndUpdate(roomId, { $push: { unavailableDates: dates } });

            res.status(200).json("Room status has been updated");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    getAllRoomsForHotel: expressAsyncHandler(async (req, res) => {
        const hotelId = req.params.hotelId;

        try {
            const rooms = await Room.find({ hotel: hotelId });
            res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    getRoomDetails: expressAsyncHandler(async (req, res) => {
        const roomId = req.params.roomId;

        try {
            const room = await Room.findById(roomId);
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }
            res.status(200).json(room);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    deleteRoom: expressAsyncHandler(async (req, res) => {
        const roomId = req.params.roomId;

        try {
            const deletedRoom = await Room.findByIdAndDelete(roomId);
            if (!deletedRoom) {
                return res.status(404).json({ message: "Room not found" });
            }
            res.status(200).json({ message: "Room deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
}

module.exports = roomsController;
