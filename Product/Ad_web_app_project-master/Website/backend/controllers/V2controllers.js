
const V2 = require("../models/V2Model");
const asyncHandler = require("express-async-handler");

//@desc     Get all data
//@route    /v2/all
//@access   Public 

exports.getAllDataForV2 = asyncHandler(async (req, res, next) => {

    let allData = await V2.find();

    res.status(200).json(allData); 
});