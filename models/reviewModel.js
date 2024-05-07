import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        reviewText: String,
        date: { type: Date, default: Date.now },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Review', reviewSchema);
