
const mongoose = require("mongoose");

const LayoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    listOfCharts: [
        {
            chartId: {
                type: String
            },
            description: {
                type: String,

            }
        }
    ],
    layoutType: String,
    idForLink: String
}, 
{
    timestamps: true
});

module.exports = mongoose.model("Layout", LayoutSchema);