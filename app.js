const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const errorsMiddleware = require('./middlewares/errors');
const limiter = require('./middlewares/rateLimit');

const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');

const authMiddleware = require('./middlewares/auth');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

// app.use(express.json());

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.use('/', signupRouter);
app.use('/', signinRouter);

app.use(authMiddleware);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Неправильный путь' });
});

app.use(errors());

app.use(errorsMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен');
});
