'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getAll);

router.get('/:id', usersController.getById);

router.delete('/:id', usersController.remove);

router.post('/', usersController.create);

router.patch('/:id', usersController.update);

module.exports = router;
