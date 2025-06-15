require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

//middleware to handle CORS-  Cross-Origin Resource Sharing. It's a security feature in browsers
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",  //Allows requests only from the domain in your .env file
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());  //When a client sends data via POST, PUT, or PATCH as JSON (Content-Type: application/json), this middleware parses it and makes it available in req.body.

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`)); //starts the server and listens to the incoming requests