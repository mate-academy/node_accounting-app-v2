const { Router } = require('express');
const usersController = require('../controllers/users.controller');

const router = Router();

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getByIdUser);

router.post('/', usersController.createUser);

router.delete('/:id', usersController.removeUser);

router.patch('/:id', usersController.updateUser);

module.exports = {
  router,
};
