
const mongoose = require("mongoose");

const V2Schema = new mongoose.Schema({
    Time: Number,
    southern_monthly: Number,
    southern_annual: Number,
    northern_monthly: Number,
    northern_annual: Number,
    global_monthly: Number,
    global_annual: Number,
    northern_reconstruction: Number,
});

module.exports = mongoose.model("V2", V2Schema);