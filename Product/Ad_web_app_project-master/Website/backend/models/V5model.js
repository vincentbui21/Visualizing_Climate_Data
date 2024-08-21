const mongoose = require("mongoose");

const V5Schema = new mongoose.Schema({
    meanAgeOfAir: Number,
    carbondioxideConcen: Number,
    chartNumber: String
});

module.exports = mongoose.model("V5", V5Schema);

