'use strict';

const express = require('express');
const usersController = require('../controller/users');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:userId', usersController.getOne);
router.post('/', usersController.addOne);
router.delete('/:userId', usersController.deleteOne);
router.patch('/:userId', usersController.updateOne);

module.exports = { router };
