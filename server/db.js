const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');

        // Log the current database name
        console.log('Current Database:', mongoose.connection.db.databaseName);
    } catch (err) {
        console.error('Connection error:', err.message);
        process.exit(1);
    }
};

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.log(err.message);
});

module.exports = connectDB;
