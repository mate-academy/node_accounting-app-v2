'use strict';

const express = require('express');
const usersControllers = require('../controllers/users');

const route = express.Router();

route.get('/', usersControllers.getAll);

route.get('/:id', usersControllers.getOne);

route.delete('/:id', usersControllers.remove);

route.post('/', usersControllers.add);

route.patch('/:id', usersControllers.update);

module.exports = {
  route,
};
