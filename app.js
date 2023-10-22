require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rateLimiter');
const { errorCatcher } = require('./middlewares/errorCatcher');

const {
  NODE_ENV,
  DATABASE_URL,
} = process.env;

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/moviesdb');
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorCatcher);

app.listen(PORT);
