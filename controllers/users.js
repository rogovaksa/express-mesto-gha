const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const InaccurateDataError = require('../errors/InaccurateDataError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) return res.send({ user });
      throw new NotFoundError('Пользователь с указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;
      return res.status(201).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким электронным адресом уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new InaccurateDataError('Переданы некорректные данные при регистрации пользователя'));
      } else {
        next(err);
      }
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) return res.send({ user });
      throw new NotFoundError('Пользователь с указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InaccurateDataError('Переданы некорректные данные при обновлении профиля пользователя'));
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) return res.send({ user });
      throw new NotFoundError('Пользователь с указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InaccurateDataError('Переданы некорректные данные при обновлении профиля пользователя'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign(
          { userId },
          'JWT_SECRET',
          { expiresIn: '7d' },
        );

        return res.send({ _id: token });
      }

      throw new UnauthorizedError('Неправильные почта или пароль');
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { userId } = req.user;
  User.findById(userId)
    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь с указанным id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getCurrentUser,
};
