const {
  ERROR_CODE_CONFLICT,
  ERROR_CODE_SERVER,
} = require('../utils/errorStatus');

const errorsMiddleware = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_SERVER, message } = err;

  if (err.code === 11000) {
    res.status(ERROR_CODE_CONFLICT).send({ message: 'Пользователь с указанным email уже существует' });
    return;
  }
  if (statusCode === ERROR_CODE_SERVER) {
    res.status(statusCode).send({ message: 'На сервере произошла ошибка' });
    return;
  }

  res.status(statusCode).send({ message });

  next();
};
module.exports = errorsMiddleware;
