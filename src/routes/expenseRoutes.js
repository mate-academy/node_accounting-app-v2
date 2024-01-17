'use strict';

const {
  get,
  getOne,
  create,
  deleted,
  update,
} = require('../controllers/expenseController');

const express = require('express');
const expensesRouter = express.Router();

expensesRouter.use(express.json());

expensesRouter.get('/', get);
expensesRouter.get('/:id', getOne);
expensesRouter.post('/', create);
expensesRouter.delete('/:id', deleted);
expensesRouter.patch('/:id', update);

module.exports = {
  expensesRouter,
};
