const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userControllers');

router.get('/', getUsers);

router.get('/:userId', getSingleUser);

router.post('/', createUser);

router.delete('/:userId', deleteUser);

router.post('/:userId/friends/:friendId', addFriend);

router.delete('/:userId/friends/:friendId', deleteFriend);

module.exports = router;