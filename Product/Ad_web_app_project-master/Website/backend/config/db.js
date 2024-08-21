
const mongoose = require("mongoose");

const connectDB = async () => {

    try {  

        let conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongo connected: ${conn.connection.host}`.green.underline.bold);


    } catch (err) {
        console.log(`Error message: ${err.message}`.red.underline.bold);
        process.exit(1);
    }

};

module.exports = connectDB;