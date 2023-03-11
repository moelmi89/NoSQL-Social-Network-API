const { Router } = require('express');
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userControllers');

const router = Router();

router.route('/')
  .get(getUsers)
  .get(getSingleUser)
  .post(createUser);

router.route('/:userId')
.get(getUsers)
.get(getSingleUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;