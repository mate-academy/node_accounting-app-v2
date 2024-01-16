'use strict';

const express = require('express');
const usersController = require('./../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.get);

router.post('/', usersController.create);

router.get('/:id', usersController.getOne);

router.delete('/:id', usersController.remove);

router.patch('/:id', usersController.update);

module.exports = { router };
