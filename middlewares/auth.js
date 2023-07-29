const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'JWT_SECRET');
  } catch (err) {
    throw new UnauthorizedError('Неверно указаны почта или пароль');
  }

  req.user = payload;
  next();
};

module.exports = authMiddleware;
