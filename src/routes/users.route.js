'use strict';

const express = require('express');
const {
  create,
  get,
  getOne,
  update,
  remove,
} = require('../controllers/user.controller');

const usersRouter = express.Router();

usersRouter.post('/', create);

usersRouter.get('/', get);

usersRouter.get('/:id', getOne);

usersRouter.patch('/:id', update);

usersRouter.delete('/:id', remove);

module.exports = {
  usersRouter,
};
