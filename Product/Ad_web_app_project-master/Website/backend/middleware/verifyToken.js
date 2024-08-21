const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id===req.params.id) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const protect = asyncHandler(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

      try {

        token = req.headers.authorization.split(" ")[1];

        let decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();

      } catch (error) {
        console.error(error);
        res.status(401)
        throw new Error("Not Authenticated!"); 
      }
     
      
    }

});
module.exports = {
  verifyToken,
  verifyTokenAndUser,
  protect
};