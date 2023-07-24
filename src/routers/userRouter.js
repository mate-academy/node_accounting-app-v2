'use strict';

const express = require('express');
const { userController } = require('../controllers/userController');

const router = express();

router.get('/users', userController.getAll);

router.post('/users', express.json(), userController.create);

router.get('/users/:userId', userController.getOne);

router.delete('/users/:userId', userController.remove);

router.patch('/users/:userId', express.json(), userController.update);

module.exports.userRouter = router;
