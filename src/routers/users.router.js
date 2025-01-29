const { Router } = require('express');
const usersController = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:userId', usersController.getOne);
usersRouter.post('/', usersController.create);
usersRouter.delete('/:userId', usersController.remove);
usersRouter.patch('/:userId', usersController.update);

module.exports = {
  usersRouter,
};
