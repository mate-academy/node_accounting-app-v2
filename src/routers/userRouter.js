'use strict';

const express = require('express');
const userController = require('../controller/user');
const router = express.Router();

router.post('/', userController.post);

router.get('/', userController.get);

router.get('/:id', userController.getId);

router.patch('/:id', userController.patch);

router.delete('/:id', userController.deleteUser);

module.exports = router;
