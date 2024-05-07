// Libraries
import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello");
});


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, (req, res) => {
            console.log("Server is running");
        })
    })
    .catch((error) => {
        console.log(error);
    })