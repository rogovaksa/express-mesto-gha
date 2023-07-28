const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

const { reg } = require('../utils/link');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

const { ERROR_CODE_NOT_FOUND } = require('../utils/errorStatus');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(limiter);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(reg),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

router.use('/', router);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.all('*', (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Неправильный путь' });
});

module.exports = router;
