'use strict';

const UserController = require('../controllers/users');

const express = require('express');

const router = express.Router();

router.get('/users', UserController.getAllUsers);

router.post('/users', UserController.addNewUser);

router.get('/users/:userId', UserController.getOneUser);

router.delete('/users/:userId', UserController.deleteUser);

router.put('/users/:userId', UserController.updateUser);

const hasAction = (currentAction) => {
  return (req, res, next) => {
    const { action } = req.query;

    if (currentAction === action) {
      next();
    } else {
      next('route');
    }
  };
};

router.patch('/users', hasAction('delete'), UserController.deleteUsers);

router.patch('/users', hasAction('update'), UserController.updateUsers);

module.exports = {
  router,
};
