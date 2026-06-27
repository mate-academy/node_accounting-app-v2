const { Router } = require('express');

const BaseService = require('../utils/baseService');
const BaseController = require('../utils/baseController');
const requireFields = require('../utils/middleware');

const userService = new BaseService();

const userController = new BaseController(userService);

const userRouter = Router();

userRouter.get('/', userController.getAll);

userRouter.post(
  '/',
  requireFields({ body: ['name'] }),
  userController.createOne,
);

userRouter.get(
  '/:paramsId',
  requireFields({ params: ['paramsId'] }),
  userController.getOne,
);

userRouter.delete(
  '/:paramsId',
  requireFields({ params: ['paramsId'] }),
  userController.deleteOne,
);

userRouter.patch(
  '/:paramsId',
  requireFields({ params: ['paramsId'] }),
  userController.updateOne,
);

module.exports = { userRouter, userService };
