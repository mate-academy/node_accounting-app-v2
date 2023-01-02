'use strict';

const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();

router.get('/', userController.get);

router.post('/', userController.add);

router.get('/:id', userController.getOne);

router.delete('/:id', userController.remove);

router.patch('/:id', userController.update);

module.exports = router;
