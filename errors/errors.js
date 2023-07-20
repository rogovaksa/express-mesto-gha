const errorMessages = {
  ERROR_VALIDATION: 'Переданы некорректные данные.',
  ERROR_NOT_FOUND: 'Данные по указанному _id не найдены.',
  ERROR_SERVER: 'Ошибка по умолчанию.',
};

const errorStatus = {
  NOT_FOUND: 404,
  VALIDATION: 400,
  SERVER: 500,
};

const showErrorStatus = (res, err) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(errorStatus.VALIDATION).send({ message: errorMessages.ERROR_VALIDATION });
    return;
  }
  if (err.name === 'Error') {
    res.status(errorStatus.NOT_FOUND).send({ message: errorMessages.ERROR_NOT_FOUND });
    return;
  }
  res.status(errorStatus.SERVER).send({ message: errorMessages.ERROR_SERVER });
};

module.exports = { errorMessages, showErrorStatus };
