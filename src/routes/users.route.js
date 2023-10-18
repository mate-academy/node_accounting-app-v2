'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/users.controller');
const {
  userIdRouteParam,
  userNameRequestBody,
} = require('./../middleware/users.middleware');

router.param('userId', userIdRouteParam);

router.route('/')
  .get(usersController.getAll)
  .post(express.json(), userNameRequestBody, usersController.create);

router.route('/:userId')
  .get(usersController.get)
  .patch(express.json(), userNameRequestBody, usersController.update)
  .delete(usersController.remove);

module.exports = router;
