'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.get('/', controller.getUsers);

router.post('/', express.json(), controller.createUser);

router.get('/:userId', controller.getUserById);

router.delete('/:userId', controller.deleteUser);

router.patch('/:userId', express.json(), controller.updateUser);

module.exports = router;
