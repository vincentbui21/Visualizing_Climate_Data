
const mongoose = require("mongoose");

const V9Schema = new mongoose.Schema({
    
 Share_of_global_greenhouse_gas_emissions: Number,
 sector:String,
 sub_sector:String,
 sub_sub_sector:String,

});

module.exports = mongoose.model("V9", V9Schema);