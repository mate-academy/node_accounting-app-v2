const { Router } = require('express');
const { usersController } = require('../controllers');

const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.post('/', usersController.create);
usersRouter.get('/:id', usersController.getOne);
usersRouter.delete('/:id', usersController.removeOne);
usersRouter.patch('/:id', usersController.update);

module.exports = usersRouter;
