const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const productRoutes = require('../routes/productRoutes');
const errorMiddleware = require('../middlewares/errorMiddleware');

dotenv.config();
const port = process.env.PORT;
const allowedOrigins = process.env.FRONTEND;
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

// routes
app.use('/api/products', productRoutes);










