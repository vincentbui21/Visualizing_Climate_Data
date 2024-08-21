
const mongoose = require("mongoose");

const V8Schema = new mongoose.Schema({
    time: Number,
    countries: [],
    countryNames:[],
    chartNumber: String,
    
});

module.exports = mongoose.model("V8", V8Schema);