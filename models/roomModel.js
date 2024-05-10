const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema(
    {
        roomNumber: { type: String, required: true },
        roomType: { type: String, enum: ['single', 'double', 'suite'], required: true },
        price: { type: Number, required: true },
        capacity: { type: Number, required: true },
        unavailableDates: [{ type: Date }],
        amenities: [String],
        images: [String]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
