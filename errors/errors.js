const errorMessages = {
  ERROR_VALIDATION: 'Переданы некорректные данные.',
  ERROR_NOT_FOUND: 'Данные по указанному _id не найдены.',
  ERROR_SERVER: 'Ошибка по умолчанию.',
};
const showErrorStatus = (res, err) => {
  if (err.name === 'CastError') {
    res.status(404).send(errorMessages.ERROR_NOT_FOUND);
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(400).send(errorMessages.ERROR_VALIDATION);
    return;
  }
  res.status(500).send(errorMessages.ERROR_SERVER);
};

module.exports = { errorMessages, showErrorStatus };
