'use strict';

const express = require('express');

const userController = require('../contolers/users.js');

const router = express.Router();

router.post('/', userController.add);

router.get('/', userController.getAll);

router.get('/:id', userController.getById);

router.patch('/:id', userController.update);

router.delete('/:id', userController.remove);

module.exports = router;
