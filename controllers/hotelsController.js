const expressAsyncHandler = require("express-async-handler");
const Hotel = require("../models/hotelModel");
const Room = require("../models/roomModel");

const hotelController = {
    createHotel: expressAsyncHandler(async (req, res) => {
        const newHotel = new Hotel(req.body);

        try {
            const savedHotel = await newHotel.save();
            res.status(200).json({ savedHotel })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    getHotels: expressAsyncHandler(async (req, res) => {
        const { min, max, ...others } = req.query;

        try {
            const hotels = await Hotel.find({
                ...others,
                cheapestPrice: { $gt: min || 1, $lt: max || 999 }
            }).limit(req.query.limit);

            res.status(200).json({ hotels });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    countHotelsByCity: expressAsyncHandler(async (req, res) => {
        const cities = req.query.cities.split(",");

        try {
            const list = await Promise.all(
                cities.map((city) => {
                    return Hotel.countDocuments({ city: city });
                })
            )

            res.status(200).json({ list });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    countHotelsByType: expressAsyncHandler(async (req, res) => {
        try {
            const luxuryCount = await Hotel.countDocuments({ hotelType: "luxury" });
            const budgetCount = await Hotel.countDocuments({ hotelType: "budget" });
            const resortCount = await Hotel.countDocuments({ hotelType: "resort" });
            const villaCount = await Hotel.countDocuments({ hotelType: "villa" });
            const lodgeCount = await Hotel.countDocuments({ hotelType: "lodge" });

            res.status(200).json([
                { hotelType: "luxury", count: luxuryCount },
                { hotelType: "budget", count: budgetCount },
                { hotelType: "resort", count: resortCount },
                { hotelType: "villa", count: villaCount },
                { hotelType: "lodge", count: lodgeCount },
            ])
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    getHotelRooms: expressAsyncHandler(async (req, res) => {
        try {
            const hotelId = req.params.id;

            const roomList = await Room.find({ hotel: hotelId });

            if (!roomList || roomList.length === 0) {
                return res.status(404).json({ message: "No rooms found for this hotel" });
            }

            res.status(200).json(roomList);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

}

module.exports = hotelController;