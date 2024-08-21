
const V6 = require("../models/V6model");
const asyncHandler = require("express-async-handler");


//@desc     Get all data
//@route    /v6/all
//@access   Public 

exports.getAllDataForV6 = asyncHandler(async (req, res, next) => {

    let allData = await V6.find();

    res.status(200).json(allData);
});
