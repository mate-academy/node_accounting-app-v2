'use strict';

const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.getAll);

router.post('/', userController.add);

router.get('/:id', userController.getOne);

router.delete('/:id', userController.remove);

router.patch('/:id', userController.update);

module.exports = { router };
