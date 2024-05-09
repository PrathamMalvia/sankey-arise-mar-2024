const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler')

const userModel = require("../models/userModel");

const userController = {
    // Register
    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;

        // Validations
        if (!username || !email || !password) {
            throw new Error("Please enter all fields");
        }

        // Check if user exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            throw new Error("User already exists");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user 
        const userCreated = await userModel.create({ username, email, password: hashedPassword });

        // Send the response
        res.json({ username: userCreated.username, email: userCreated.email, id: userCreated.id });
    }),

    // Login
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "30d" })

        // Send the response
        res.json({ message: "Login success", token, id: user._id, email: user.email, username: user.username });
    }),

    // Profile
    profile: asyncHandler(async (req, res) => {
        try {
            // Find the user
            const user = await userModel.findById(req.user).select("-password");
            if (!user) {
                throw new Error("User not found");
            }
            res.json({ user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    // Get user by ID
    getUser: asyncHandler(async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await userModel.findById(userId).select("-password");
            if (!user) {
                throw new Error("User not found");
            }
            res.json({ user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    // Get all users
    getAllUsers: asyncHandler(async (req, res) => {
        try {
            const users = await userModel.find().select("-password");
            res.json({ users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    // Update user
    updateUser: asyncHandler(async (req, res) => {
        try {
            const userId = req.params.userId;
            const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, { new: true }).select("-password");
            if (!updatedUser) {
                throw new Error("User not found");
            }
            res.json({ updatedUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    // Delete user
    deleteUser: asyncHandler(async (req, res) => {
        try {
            const userId = req.params.userId;
            const deletedUser = await userModel.findByIdAndDelete(userId).select("-password");
            if (!deletedUser) {
                throw new Error("User not found");
            }
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
}

module.exports = userController;