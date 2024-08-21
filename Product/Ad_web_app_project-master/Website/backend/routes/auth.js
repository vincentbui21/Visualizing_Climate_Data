const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {authRegister,authLogin} = require('../controllers/AuthController')

//REGISTER
router.post("/register", authRegister);

//LOGIN
router.post("/login", authLogin);

module.exports = router;