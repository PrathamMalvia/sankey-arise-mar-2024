const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        contact: {
            phone: String,
            email: String,
            // Other contact information
        },
        description: String,
        amenities: [String],
        ratings: [{ type: Number, min: 1, max: 5 }],
        reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
        images: [String],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema)