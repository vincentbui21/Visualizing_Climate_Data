
const V3 = require("../models/V3model");
const asyncHandler = require("express-async-handler");

//@desc     Get all data
//@route    /v3/all
//@access   Public 

exports.getAllDataOfV3 = asyncHandler(async (req, res, next) => {

    let allData = await V3.find();

    res.status(200).json(allData);

});