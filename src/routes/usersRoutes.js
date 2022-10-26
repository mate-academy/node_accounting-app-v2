'use strict';

const express = require('express');

const userController = require('../controllers/users');

const router = express.Router();

router.post('/', userController.add);

router.get('/', userController.getAll);

router.get('/:id', userController.getUserById);

router.patch('/:id', userController.update);

router.delete('/:id', userController.remove);

module.exports = router;
