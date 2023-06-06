'use strict';

const express = require('express');
const expencesRouter = express.Router();

const {
  getAll,
  getOne,
  create,
  remove,
  update,
} = require('../controlers/expences');

expencesRouter.get('/', getAll);
expencesRouter.get('/:expensesId', getOne);
expencesRouter.post('/', express.json(), create);
expencesRouter.delete('/:expensesId', remove);
expencesRouter.patch('/:expensesId', express.json(), update);

module.exports = expencesRouter;
