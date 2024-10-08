'use strict';

const { Router } = require('express');
const usersController = require('../controllers/usersController');
const ROUTES = require('../constants/route');

const router = Router();

router.get(ROUTES.USERS, usersController.get);
router.get(ROUTES.USER_BY_ID, usersController.getUserById);
router.post(ROUTES.USERS, usersController.create);
router.patch(ROUTES.USER_BY_ID, usersController.update);
router.delete(ROUTES.USER_BY_ID, usersController.remove);

module.exports = {
  usersRouter: router,
};
