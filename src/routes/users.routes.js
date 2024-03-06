'use strict';

const Router = require('express');

const userController = require('../controllers/user.controller');
const { reqBodyValidation } = require('../middleware/validation.middleware');
const { userReqSchema } = require('../libs/validation.schemas/user.schemas');

const router = Router();

router.get('/', userController.get);

router.get('/:id', userController.getOne);

router.delete('/:id', userController.remove);

router.post(
  '/',
  reqBodyValidation(userReqSchema),
  userController.create
);

router.patch(
  '/:id',
  reqBodyValidation(userReqSchema),
  userController.update
);

module.exports = router;
