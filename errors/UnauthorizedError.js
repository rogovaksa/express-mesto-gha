const { ERROR_CODE_AUTH } = require('../utils/errorStatus');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_AUTH;
  }
}

module.exports = UnauthorizedError;
