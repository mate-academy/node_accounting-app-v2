'use strict';

const express = require('express');

function createUserRoutes(userController) {
  const router = express.Router();

  router.get('/', (req, res) => userController.getAllUsers(req, res));
  router.post('/', (req, res) => userController.createUser(req, res));
  router.get('/:id', (req, res) => userController.getUserById(req, res));
  router.patch('/:id', (req, res) => userController.updateUser(req, res));
  router.delete('/:id', (req, res) => userController.deleteUser(req, res));

  return router;
}

module.exports = { createUserRoutes };
