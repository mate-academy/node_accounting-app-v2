const express = require('express');
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/users.controller.js');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

module.exports = { usersRoutes: router };
