const dotenv = require("dotenv");
const express = require("express");
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;
const DB_CONN_STRING = process.env.DATABASE_URL;

const app = express();
app.use(express.json());
connectDB(DB_CONN_STRING);

//Add server routes
//Hook error handler

app.listen(PORT, () => {
    console.log(`Running in ${ENV} on ${PORT}, waiting for requests`);
});