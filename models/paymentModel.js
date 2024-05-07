import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
        amount: { type: Number, required: true },
        paymentMethod: String,
        status: { type: String, enum: ['paid', 'pending', 'failed'], default: 'pending' },
        transactionId: String,
        paymentDate: { type: Date, default: Date.now },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Payment', paymentSchema);
