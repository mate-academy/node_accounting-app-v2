'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/', usersController.get);

router.get('/:id', usersController.getById);

router.post('/', express.json(), usersController.create);

router.patch('/:id', express.json(), usersController.update);

router.delete('/:id', usersController.deleteById);

module.exports = router;
