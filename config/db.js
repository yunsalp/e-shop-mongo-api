const mongoose = require('mongoose');

const connectDB = (connStr) => {
    mongoose.connect(connStr);
    const database = mongoose.connection;
    database.on('error', (error) => {
        console.log('DB Error:', error);
    });
    database.once('connected', () => {
        console.log('Database connected successfully');
    });
}

module.exports = connectDB;