
const mongoose = require("mongoose");

const V6Schema = new mongoose.Schema({
    ageGasCal: Number,
    carbondioxidePpm: Number,
    chartNumber: String
});

module.exports = mongoose.model("V6", V6Schema);