const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.post('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUserById);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
