const mongoose = require("mongoose");

const V4Schema = new mongoose.Schema({
    year: Number,
    co2_annually: Number, 
    de08_co2_mixing_ratio: Number,
    de08_2_co2_mixing_ratio: Number,
    dss_co2_mixing_ratio: Number,
    chartnumber: String,
    event: String,
});

module.exports = mongoose.model("V4", V4Schema);
