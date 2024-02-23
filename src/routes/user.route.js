const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.get('/', userController.get);

router.post('/', express.json(), userController.create);

router.get('/:id', express.json(), userController.getOne);

router.delete('/:id', express.json(), userController.remove);

router.patch('/:id', express.json(), userController.update);

module.exports = {
  userRouter: router,
};
