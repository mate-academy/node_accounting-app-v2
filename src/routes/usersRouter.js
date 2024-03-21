const { Router } = require('express');
const usersController = require('../controllers/usersController');

const router = Router();

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUserById);

router.post('/', usersController.addUser);

router.patch('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = {
  usersRouter: router,
};
