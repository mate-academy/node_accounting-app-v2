const {
  create,
  deleteOne,
  getAll,
  getOne,
  update,
} = require('../controllers/users.controller.js');
const { Router } = require('express');

const usersRouter = Router();

usersRouter.get('/', getAll);
usersRouter.post('/', create);
usersRouter.get('/:id', getOne);
usersRouter.delete('/:id', deleteOne);
usersRouter.patch('/:id', update);

module.exports = { usersRouter };
