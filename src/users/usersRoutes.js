const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUsersById,
  postUsers,
  putUsersById,
  patchUsersById,
  deleteUsersById,
} = require('./usersController');

router.get('/', getUsers);
router.get('/:id', getUsersById);
router.post('/', postUsers);
router.put('/:id', putUsersById);
router.patch('/:id', patchUsersById);
router.delete('/:id', deleteUsersById);

module.exports = router;
