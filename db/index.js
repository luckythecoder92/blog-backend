const mongoose = require('mongoose');


async function config() {
    try {
        // Use full connection string from environment
        const connectionString = process.env.MONGO_URI; // Should include database name
        
        console.log('Connection string:', connectionString); // Debug line
        
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

module.exports = { config };