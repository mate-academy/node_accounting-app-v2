'use strict';

const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user.controller');

router.get('/', userController.get);

router.get('/:id', userController.getOne);

router.post('/', userController.create);

router.patch('/:id', userController.update);

router.delete('/:id', userController.remove);

module.exports = router;
