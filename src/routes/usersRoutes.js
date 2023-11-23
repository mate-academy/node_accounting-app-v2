const express = require('express');
const {
  loadUsers,
  loadOneUser,
  addOneUser,
  changeOneUser,
  removeUser,
} = require('../controllers/usersControllers');

const usersRouter = express.Router();

router.get('/', cors(), loadUsers);

router.get('/:id', loadOneUser);

router.post('/', addOneUser);

router.put('/:id', changeOneUser);

router.delete('/:id', removeUser);

module.exports = {
  usersRouter,
};
