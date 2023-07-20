const User = require('../models/user');
const { errorMessages, errorStatus, showErrorStatus } = require('../errors/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(errorStatus.SERVER).send(errorMessages.ERROR_SERVER));
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) { throw new Error(); } else { res.send(user); }
    })
    .catch((err) => showErrorStatus(res, err));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => showErrorStatus(res, err));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) { throw new Error(); } else { res.send(user); }
    })
    .catch((err) => showErrorStatus(res, err));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) { throw new Error(); } else { res.send(user); }
    })
    .catch((err) => showErrorStatus(res, err));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
