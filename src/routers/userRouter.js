'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.post);

router.get('/', userController.get);

router.get('/:id', userController.getId);

router.patch('/:id', userController.patch);

router.delete('/:id', userController.deleteUser);

module.exports = router;
