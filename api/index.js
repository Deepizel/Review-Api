const express = require('express');
const app = express();



// Declare routes
app.get('/', (req, res) => {
    res.send('Hello World');
});



app.listen('3000', () => {
    console.log('Api Server is running on port 3000');
});