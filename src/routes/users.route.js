'use strict';

const ROUTES = {
  BASE: '/',
  ID: '/:id',
};

const express = require('express');
const usersController = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get(ROUTES.BASE, usersController.get);
usersRouter.post(ROUTES.BASE, usersController.create);
usersRouter.get(ROUTES.ID, usersController.getOne);
usersRouter.delete(ROUTES.ID, usersController.remove);
usersRouter.patch(ROUTES.ID, usersController.update);

module.exports = {
  usersRouter,
};
