
const mongoose = require("mongoose");

const V7Schema = new mongoose.Schema({
    time: Number,
    surface_temp: Number,
    carbon_dioxide: Number,
    chartnumber: String,
    Event:String,
});

module.exports = mongoose.model("V7", V7Schema);