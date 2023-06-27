const express = require('express');
const logger = require('./middleware/logger');
const route = require('./routes/bookRoute');
const error = require('./middleware/error-404');

const app = express();

app.use(express.json());
app.use('/api/books', route);
app.use(logger);
app.use(error);

const PORT = process.env.PORT || 3000
app.listen(PORT)