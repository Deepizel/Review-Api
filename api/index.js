const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const productRoutes = require('../routes/productRoutes');


dotenv.config();
const port = process.env.PORT;

// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log('Api Server is running on port specified in the environment variable');
    });
}).catch((err) => {
    console.log(err);
});

// Middleware to use json
app.use(express.json());
// to use form data sending
app.use(express.urlencoded({ extended: true }));
// Declare routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

// routes
app.use('/api/products', productRoutes);










