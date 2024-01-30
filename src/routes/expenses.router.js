'use strict';

const expensesController = require('../controllers/expenses.constroller');
// const express = require('express');
const { Router } = require('express');

const expensesRouter = Router();

expensesRouter.get('/:id', expensesController.getOneExp);
expensesRouter.get('/', expensesController.getAllExp);
// expensesRouter.post('/', expensesController.addUser);
// expensesRouter.delete('/:id', expensesController.deleteUser);
// expensesRouter.patch('/:id', expensesController.editUser);

module.exports = { expensesRouter };
