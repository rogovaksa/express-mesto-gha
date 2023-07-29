const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { URL_REGEX } = require('../utils/link');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (email) => /.+@.+\..+/.test(email),
        message: 'Некорректный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: ({ length }) => length >= 6,
        message: 'Длина пароля должна быть не менее 8 символов',
      },
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (link) => URL_REGEX.test(link),
        message: 'Некорректный URL',
      },
    },
  },

  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this
          .findOne({ email })
          .select('+password')
          .then((user) => {
            if (user) {
              return bcrypt.compare(password, user.password)
                .then((matched) => {
                  if (matched) return user;

                  return Promise.reject();
                });
            }

            return Promise.reject();
          });
      },
    },
  },

);

module.exports = mongoose.model('user', userSchema);
