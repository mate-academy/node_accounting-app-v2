'use strict';

const express = require('express');
const controllers = require('../controllers/users');
const userRouter = express.Router();

userRouter.get('/', controllers.getAll);
userRouter.get('/:userId', controllers.getOne);
userRouter.post('/', controllers.add);
userRouter.delete('/:userId', controllers.remove);
userRouter.patch('/:userId', controllers.update);

module.exports = { userRouter };
