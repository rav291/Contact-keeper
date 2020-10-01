const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false })) // Bodyparser is included in express, hence, now we can get req.body data, in  routes

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Srve static assets (React) in production

if (process.env.NODE_ENV === 'production') {
    // Set static folder (React build folder)
    app.use(express.static('client/build'))

    app.get('*', (req, res) => { // * means everything except the routes above
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// We are checking if the environment is in production, if it is, then load a static folder(react build folder), 
// and then have the * route so that when we hit it (the home page), we load the index.html

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));