'use strict';

const { Router } = require('express');
const {
  getAll,
  getById,
  post,
  remove,
  patch,
} = require('../controllers/expensesController');

const expensesRouter = Router();

expensesRouter.get('/', getAll);
expensesRouter.get('/:id', getById);
expensesRouter.post('/', post);
expensesRouter.delete('/:id', remove);
expensesRouter.patch('/:id', patch);

module.exports = {
  expensesRouter,
};
