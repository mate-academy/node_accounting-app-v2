'use strict';

const {
  Router,
} = require('express');
const userControllers = require('../controllers/user.controller');

const router = Router();

router.get('/', userControllers.get);

router.get('/:userId', userControllers.getById);

router.patch('/:userId', userControllers.update);

router.post('/', userControllers.create);

router.delete('/:userId', userControllers.remove);

module.exports = {
  router,
};
