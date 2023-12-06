'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.get);
router.post('/', usersController.postOne);
router.get('/:id', usersController.getOneById);
router.delete('/:id', usersController.deleteOne);
router.patch('/:id', usersController.updateOne);

module.exports = {
  userRouter: router,
};
