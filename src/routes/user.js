'use strict';

const userController = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.post('/users', express.json(), userController.add);

router.get('/users', express.json(), userController.getALL);

router.get('/users/:userId', express.json(), userController.getOne);

router.patch('/users/:userId', express.json(), userController.update);

router.delete('/users/:userId', express.json(), userController.remove);

module.exports = router;
