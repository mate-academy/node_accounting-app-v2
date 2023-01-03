'use strict';

const express = require('express');
const { usersController } = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);

usersRouter.get('/:userId', usersController.findOne);

usersRouter.post('/', usersController.addOne);

usersRouter.patch('/:userId', usersController.updateOne);

usersRouter.delete('/:userId', usersController.deleteOne);

module.exports = { usersRouter };
