const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profile: {
            firstName: String,
            lastName: String,
            phoneNumber: Number,
            // Other profile details
        },
        role: { type: String, enum: ['admin', 'user'], default: 'user' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
