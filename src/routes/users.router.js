const { Router } = require('express');
const usersController = require('../controllers/users.controller.js');

const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.post('/', usersController.createUser);
usersRouter.get('/:userId', usersController.getById);
usersRouter.delete('/:userId', usersController.deleteUser);
usersRouter.patch('/:userId', usersController.updateUser);

module.exports = usersRouter;
