'use strict';

const express = require('express');
const rounter = express.Router();
const userController = require('../controllers/users');

rounter.get('/', userController.getAll);
rounter.get('/:userId', userController.getOne);
rounter.post('/', userController.add);
rounter.delete('/:userId', userController.remove);
rounter.patch('/:userId', userController.update);

module.exports = {
  rounter,
};
