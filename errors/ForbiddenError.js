const { ERROR_CODE_FORBIDDEN } = require('../utils/errorStatus');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
