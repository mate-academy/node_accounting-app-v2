'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controlers/usersController');

router.post('/', userController.post);

router.get('/', userController.get);

router.get('/:id', userController.getId);

router.patch('/:id', userController.patch);

router.delete('/:id', userController.deleteItem);

module.exports = router;
