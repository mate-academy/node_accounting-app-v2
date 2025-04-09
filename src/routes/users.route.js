// import  from 'express';
// import * as userController from '../controllers/users.controller';

const express = require('express');

const router = express.Router();
const userController = require('../controllers/users.controller.js');

router.get('/', userController.get);

router.get('/:id', userController.getOne);

router.post('/', userController.add);

router.delete('/:id', userController.remove);

router.patch('/:id', userController.update);

module.exports = {
  router,
};
