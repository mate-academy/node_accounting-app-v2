'use strict';

const userController = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.get('/users', userController.getAll);
router.get('/users/:userId', userController.getOne);

router.post('/users', express.json(), userController.add);

router.patch('/users/:userId', express.json(), userController.update);

router.delete('/users/:userId', userController.remove);

module.exports = router;
