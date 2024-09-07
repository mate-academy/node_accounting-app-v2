const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

router
  .get('/', usersController.getAllUsers)
  .post('/', usersController.createUser)
  .get('/:id', usersController.getOneUser)
  .patch('/:id', usersController.updateUser)
  .delete('/:id', usersController.removeUser);

module.exports = router;
