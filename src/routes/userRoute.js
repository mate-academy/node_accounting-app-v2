'use strict';

const {
  getAll,
  getOne,
  create,
  update,
  deleted,
} = require('../controllers/userController');

const express = require('express');
const userRoute = express.Router();

userRoute.use(express.json());

userRoute.get('/', getAll);
userRoute.get('/:id', getOne);
userRoute.post('/', create);
userRoute.patch('/:id', update);
userRoute.delete('/:id', deleted);

module.exports = {
  userRoute,
};
