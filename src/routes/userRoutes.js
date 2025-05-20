const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
} = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser);

module.exports = router;
