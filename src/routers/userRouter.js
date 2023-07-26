'use strict';

const express = require('express');
const { userController } = require('../controllers/userController');

const router = express();

router.get('/', userController.getAll);

router.post('/', express.json(), userController.create);

router.get('/:userId', userController.getOne);

router.delete('/:userId', userController.remove);

router.patch('/:userId', express.json(), userController.update);

module.exports.userRouter = router;
