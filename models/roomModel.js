const mongoose = require("mongoose");
const Schema = mongoose.Schema

const roomSchema = new mongoose.Schema(
    {
        hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
        roomNumber: { type: String, required: true },
        type: { type: String, enum: ['single', 'double', 'suite'], required: true },
        price: { type: Number, required: true },
        capacity: { type: Number, required: true },
        available: { type: Boolean, default: true },
        amenities: [String],
        images: [String],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
