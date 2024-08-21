const V4 = require("../models/V4model");
const asyncHandler = require("express-async-handler");
//@desc     Get all data
//@route    /v4/all
//@access   Public 

exports.getAllDataOfV4 = asyncHandler(async (req, res, next) =>  {

    let allData = await V4.find();

    res.status(200).json(allData);
});