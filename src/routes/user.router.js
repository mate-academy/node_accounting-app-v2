'use strict';

const express = require('express');
const userController = require('../controllers/user.controllers');

const router = express.Router();

const ROUTES = {
  ROOT: '/',
  ID: '/:id',
};

router
  .get(ROUTES.ROOT, userController.getAllUsers)
  .post(ROUTES.ROOT, userController.createUser)
  .get(ROUTES.ID, userController.getUserById)
  .delete(ROUTES.ID, userController.removeUserById)
  .patch(ROUTES.ID, userController.updateUserById);

module.exports = {
  router,
};
