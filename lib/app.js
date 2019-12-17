const express = require('express');
const app = express();

app.use(express.json());

// app.use('/api/v1/RESOURCE', require('./routes/resource'));
app.use('/api/v1/trips', require('./routes/trips'));
app.use('/api/v1/itinerary-items', require('./routes/itinerary-items'));



app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
