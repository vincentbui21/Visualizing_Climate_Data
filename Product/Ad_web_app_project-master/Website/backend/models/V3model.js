
const mongoose = require("mongoose");

const V3Schema = new mongoose.Schema({
    Time: Number,
    co2_monthly_avg: Number, 
    co2_annual_avg: Number,
    chartNumber: String
});

module.exports = mongoose.model("V3", V3Schema);
