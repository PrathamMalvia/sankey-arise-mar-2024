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
        // Find the user
        const user = await userModel.findById("663a8d055f490a24a76e4994").select("-password");
        res.json({ user });
    })
}

module.exports = userController;