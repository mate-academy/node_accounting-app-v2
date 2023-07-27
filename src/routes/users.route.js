'use strict';

const express = require('express');
const { usersController } = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.getAll);

router.get('/:id', usersController.getOne);

router.patch('/:id', usersController.update);

router.delete('/:id', usersController.remove);

router.post('/', express.json(), usersController.add);

module.exports = { router };
