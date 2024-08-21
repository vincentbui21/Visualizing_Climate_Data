const V9 = require("../models/V9model");
const asyncHandler = require("express-async-handler");
//@desc     Get all data
//@route    /v9/all
//@access   Public 

exports.getAllDataForV9 = asyncHandler(async (req, res, next) => {

    let allData = await V9.find();
    
    res.status(200).json(allData);
});
