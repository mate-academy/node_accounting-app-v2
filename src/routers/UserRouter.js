'use strict';

const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.get);
router.post('/', UserController.create);
router.get('/:id', UserController.getById);
router.delete('/:id', UserController.remove);
router.patch('/:id', UserController.update);

module.exports = { UserRouter: router };
