const { Router } = require('express');
const { usersController } = require('./usersController');

const usersRouter = Router();

usersRouter.get(`/`, usersController.getAll);
usersRouter.get(`/:id`, usersController.getSingle);
usersRouter.post(`/`, usersController.create);
usersRouter.delete(`/:id`, usersController.deleteUser);
usersRouter.patch(`/:id`, usersController.update);

module.exports = {
  usersRouter,
};
