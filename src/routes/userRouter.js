'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAll);
router.post('/', userController.create);
router.get('/:id', userController.get);
router.patch('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = {
  router,
};
