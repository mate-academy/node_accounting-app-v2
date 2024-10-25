const express = require('express');
const { validateFields } = require('./../middlewares/validateFields');
const { validateEntry } = require('./../middlewares/validateEntry');
const userController = require('./../controllers/user.controller');
const router = express.Router();

router.get('/', userController.get);

router.post('/', validateFields(['name']), userController.create);

router.get('/:id', validateEntry('user'), userController.getOne);

router.delete('/:id', validateEntry('user'), userController.remove);

router.patch('/:id', validateEntry('user'), userController.update);

module.exports = { router };
