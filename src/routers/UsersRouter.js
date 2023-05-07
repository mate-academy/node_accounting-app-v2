'use strict';

const usersController = require('../controllers/UsersController');
const express = require('express');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:userId', usersController.getOne);
router.post('/', express.json(), usersController.add);
router.delete('/:userId', usersController.remove);
router.put('/:userId', express.json(), usersController.update);

const hasAction = (action) => {
  return (req, res, next) => {
    if (req.query.action === action) {
      next();
    } else {
      next('route');
    }
  };
};

router.patch('/', hasAction('delete'), usersController.removeMany);
router.patch('/', hasAction('update'), usersController.updateMany);

module.exports = { router };
