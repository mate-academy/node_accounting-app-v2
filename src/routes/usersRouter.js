'use strict';

const { Router } = require('express');
const {
  get,
  getById,
  remove,
  patch,
  post,
} = require('../controllers/usersController');

const usersRouter = Router();

usersRouter.get('/', get);
usersRouter.get('/:id', getById);
usersRouter.post('/', post);
usersRouter.delete('/:id', remove);
usersRouter.patch('/:id', patch);

module.exports = {
  usersRouter,
};
