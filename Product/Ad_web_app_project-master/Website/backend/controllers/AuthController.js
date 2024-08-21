const bcrypt = require("bcrypt");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
//const jwt = require("jsonwebtoken");
const validatePassword = require("./validatePassword");
const validateEmail = require("./validateEmail");
const validateUsername = require("./validateUsername");
const getToken = require("./getToken");

module.exports = {
  authRegister: asyncHandler(async (req, res) => {
    let validUsername = validateUsername(req.body.username);
    if (!validUsername) {
      res.status(400);
      throw new Error(
        "Invalid username, username should be alphanumeric and contain 5-12 characters"
      );
    }

    let checkUserExists = await User.findOne({ username: req.body.username });

    if (checkUserExists) {
      res.status(400);
      throw new Error("Username already exists! Please fill again.");
    }

    let emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      res.status(400);
      throw new Error("Email already exists! Please fill again.");
    }

    let validEmail = validateEmail(req.body.email);
    if (!validEmail) {
      res.status(400);
      throw new Error(
        "Invalid email, email should contain letters,numbers,@..."
      );
    }

    let validPassword = validatePassword(req.body.password);
    if (!validPassword) {
      res.status(400);
      throw new Error(
        "Invalid password, password should contain at least 8 characters with numbers,lowercase & uppercase letters!!"
      );
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      });

      const user = await newUser.save();
      res.status(200).json({
        userId: user._id,
        username: user.username,
        email: user.email,
        token: getToken(user._id),
      });
    } catch (error) {
      res.status(500).json(err);
    }
  }),

  authLogin: asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(400);
      throw new Error("Wrong credentials!");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);

    if (!validated) {
      res.status(400);
      throw new Error("Wrong credentials!");
    }

    try {
      //not sending password back to users
      const { password, ...others } = user._doc;
      res.status(200).json({
        ...others,
        token: getToken(user._id),
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }),
};

