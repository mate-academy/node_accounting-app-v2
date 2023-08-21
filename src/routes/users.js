'use strict';

const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getAll);

router.get('/:id', userController.getById);

router.delete('/:id', userController.remove);

router.post('/', userController.create);

router.patch('/:id', userController.update);

module.exports = router;
