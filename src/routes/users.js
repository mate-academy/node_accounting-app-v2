'use strict';

// const { express } = require('express');
const usersController = require('../controller/users');

const express = require('express');
const router = express.Router();

router.get('/', usersController.getAll);

router.get('/:userId', usersController.findOne);

router.post('/', express.json(), usersController.addOne);

router.delete('/:userId', usersController.deleteOne);

router.patch('/:userId', express.json(), usersController.patchOne);

module.exports = { router };
