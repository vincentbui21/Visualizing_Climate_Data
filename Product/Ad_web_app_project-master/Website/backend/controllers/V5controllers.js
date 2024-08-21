
const V5 = require("../models/V5model");
const asyncHandler = require("express-async-handler");
//@desc     Get all data
//@route    /v5/all
//@access   Public 

exports.getAllDataForV5 = asyncHandler(async (req, res, next) =>  {

    let allData = await V5.find();

    res.status(200).json(allData);
});