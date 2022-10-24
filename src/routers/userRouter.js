'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.patch('/:id', userController.patch);

router.delete('/:id', userController.deleteUser);

router.post('/', userController.post);

router.get('/', userController.get);

router.get('/:id', userController.getId);

module.exports = router;
