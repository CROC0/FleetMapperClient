const express = require('express');
const cors = require('cors');
const api = require('./api');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(morgan('tiny'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('connected to API');
});

app.use('/api', api);

module.exports = app;
