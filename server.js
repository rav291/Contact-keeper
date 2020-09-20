const express = require('express');

const app = express();

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.json({ msg: 'Astralis is rapidly climbing the rank list' }));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));