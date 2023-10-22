const dotenv = require("dotenv");
const express = require("express");
const connectDB = require('./config/db');
const categoriesRoute = require('./routes/categories');
const brandsRoute = require('./routes/brands');
const productsRoute = require('./routes/products');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config({path: './config/config.env'});
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;
const DB_CONN_STRING = process.env.DATABASE_URL;

const app = express();
app.use(express.json());
connectDB(DB_CONN_STRING);

//Add server routes
app.use('/api/products/categories', categoriesRoute);
app.use('/api/products/brands', brandsRoute);
app.use('/api/products', productsRoute);
//Hook error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Running in ${ENV} on ${PORT}, waiting for requests`);
});