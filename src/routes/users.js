'use strict';

const UserController = require('../controllers/users');

const express = require('express');

const router = express.Router();

router.get('/', UserController.getAllUsers);

router.post('/', UserController.addNewUser);

router.get('/:userId', UserController.getOneUser);

router.delete('/:userId', UserController.deleteUser);

router.put('/:userId', UserController.updateUser);

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

router.patch('/', hasAction('delete'), UserController.deleteUsers);

router.patch('/', hasAction('update'), UserController.updateUsers);

module.exports = {
  router,
};
