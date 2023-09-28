'use strict';

const express = require('express');
const expensesRouter = express.Router();

expensesRouter.get('/');
expensesRouter.get('/:id');
expensesRouter.post('/');
expensesRouter.patch('/:id');
expensesRouter.delete('/:id');

module.exports = { expensesRouter };
