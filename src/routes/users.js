'use strict';

const express = require('express');
const userControler = require('../controllers/users');

const router = express.Router();

router.get('/', userControler.getAllUser);

router.get('/:userId', userControler.getOneUser);

router.post('/', userControler.addUser);

router.patch('/:userId', userControler.updateUser);

router.delete('/:userId', userControler.deleteUser);

module.exports = {
  router,
};
