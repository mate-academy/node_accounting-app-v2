'use strict';

const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();

router.post('/', userController.add);
router.get('/', userController.getAll);
router.get('/:userId', userController.getSingle);
router.patch('/:userId', userController.update);
router.delete('/:userId', userController.remove);

module.exports = userController;
