const express = require("express");

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController")

const router = express.Router();

router.post("/register", registerUser); // Register a new user, registerUser function handles user registration and is present in authController

router.post("/login", loginUser); // Login an existing user

router.get("/getuser",protect , getUserInfo); // Get user information , getUserInfo function handles fetching user info and is present in authController

module.exports = router; // Export the router to be used in the main app file