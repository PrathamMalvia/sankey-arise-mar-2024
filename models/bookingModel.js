const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
        room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
        checkInDate: { type: Date, required: true },
        checkOutDate: { type: Date, required: true },
        numberOfGuests: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        status: { type: String, enum: ['confirmed', 'pending', 'cancelled'], default: 'pending' },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Booking', bookingSchema);
