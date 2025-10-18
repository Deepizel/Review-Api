
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cors = require('cors');
const productRoutes = require('../routes/productRoutes');
const userRoutes = require('../routes/authRoutes');
const errorMiddleware = require('../middlewares/errorMiddleware');
const authMiddleware = require("../middlewares/authMiddleware");

dotenv.config();
// environment variables
const port = process.env.PORT;
const allowedOrigins = process.env.FRONTEND;
// start of express app
const app = express();

// connect to mongodb
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log('Api Server is running on port specified in the environment variable');
    });
}).catch((err) => {
    console.log(err);
});
// this only allows requests from the localhost:3000
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
}
// enable cors
app.use(cors(corsOptions));
// Middleware to use json
app.use(express.json());
// to use form data sending
app.use(express.urlencoded({ extended: true }));
// Declare routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
// error middleware
app.use(errorMiddleware);
app.use(authMiddleware);
// routes
app.use('/api/products', productRoutes);
app.use('/api/users', authMiddleware, userRoutes);










