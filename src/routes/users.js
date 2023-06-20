'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const {
  checkCorrectBodyParams,
} = require('../middleware/checkCorrectBodyParams');
const { checkCorrectId } = require('../middleware/checkCorrectId');

router.post('/', checkCorrectBodyParams(['name']), userController.add);
router.get('/', userController.getAll);
router.get('/:userId', checkCorrectId('userId', 400), userController.getOne);

router.patch(
  '/:userId',
  checkCorrectId('userId', 400),
  checkCorrectBodyParams(['name']),
  userController.update
);

router.delete(
  '/:userId',
  checkCorrectId('userId', 404),
  userController.remove
);

module.exports = {
  router,
};
