'use strict';

const express = require('express');
const expensesRouter = express.Router();

const {
  getAll,
  getOne,
  create,
  remove,
  update,
} = require('../controlers/expences');

expensesRouter.get('/', getAll);
expensesRouter.get('/:expensesId', getOne);
expensesRouter.post('/', create);
expensesRouter.delete('/:expensesId', remove);
expensesRouter.patch('/:expensesId', update);

module.exports = expensesRouter;
