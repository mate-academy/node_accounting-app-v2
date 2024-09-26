'use strict';

const {
  getOne,
  getAll,
  add,
  remove,
  update,
} = require('../controllers/expenses.js');
const express = require('express');

const expensesRouter = express.Router();

expensesRouter.get('/', getAll);
expensesRouter.get('/:expensesId', getOne);
expensesRouter.post('/', express.json(), add);
expensesRouter.delete('/:expensesId', remove);
expensesRouter.patch('/:expensesId', express.json(), update);

module.exports = {
  expensesRouter,
};
