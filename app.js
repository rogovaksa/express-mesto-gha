const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use('/users', usersRouter);

app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '64b9a1f6fab3a98cc2b5c6e2',
  };
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен');
});
