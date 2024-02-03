'use strict';

const express = require('express');
const {
  getAllUsers,
  createOneUser,
  getOneUser,
  deleteOneUser,
  updateOneUser,
} = require('../controllers/users.controller');

const Userouter = express.Router;

Userouter.get('/', getAllUsers);
Userouter.get('/:id', getOneUser);
Userouter.post('/', createOneUser);
Userouter.delete('/:id', deleteOneUser);
Userouter.patch('/:id', updateOneUser);

module.exports = {
  Userouter,
};
