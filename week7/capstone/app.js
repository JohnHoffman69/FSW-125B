const express = require('express');
const morgan = require('morgan');
const app = express();

const PORT = 5000;


// Middleware (For all requests),
app.use(express.json())
app.use(morgan('dev'));

// Routes
app.use('/players', require('./routes/route.js'));

// Listen to port 5000 
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});