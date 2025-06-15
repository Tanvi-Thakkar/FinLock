const express = require("express");

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController")