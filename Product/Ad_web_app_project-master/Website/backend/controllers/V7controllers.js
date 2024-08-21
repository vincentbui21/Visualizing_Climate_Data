const V7 = require("../models/V7model");
const asyncHandler = require("express-async-handler");
//@desc     Get all data
//@route    /v7/all
//@access   Public 

exports.getAllDataForV7 = asyncHandler(async (req, res, next) => {

    let allData = await V7.find();

    res.status(200).json(allData);
});
