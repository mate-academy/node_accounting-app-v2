'use strict';

const express = require('express');
const { usersController } = require('../controllers/usersContoller');

const usersRoute = express.Router();

usersRoute.get('/users', usersController.getAll);

usersRoute.get('/users/:userId', usersController.getOne);

usersRoute.post('/users', express.json(), usersController.addOne);

usersRoute.delete('/users/:userId', usersController.deleteOne);

usersRoute.patch('/users/:userId', express.json(), usersController.updateOne);

module.exports = usersRoute;
