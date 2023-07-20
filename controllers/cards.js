const Card = require('../models/card');
const { showErrorStatus } = require('../errors/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => showErrorStatus(res, err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => showErrorStatus(res, err));
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(() => {
      res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => showErrorStatus(res, err));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => showErrorStatus(res, err));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => showErrorStatus(res, err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
