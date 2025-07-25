

const mongoose = require('mongoose');
const DB_NAME = require('../constants.js');

async function config() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

module.exports = { config };
