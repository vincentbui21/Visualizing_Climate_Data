const V8 = require("../models/V8model");
const asyncHandler = require("express-async-handler");
//@desc     Get all data
//@route    /v8/all
//@access   Public 

exports.getAllDataForV8 = asyncHandler(async (req, res, next) => {

    let allData = await V8.find();
    
    res.status(200).json(allData);
});
