'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller.js.js');
const usersController = require('../controllers/users.controller.js');

const expensesRouter = express.Router();
const usersRouter = express.Router();

expensesRouter.get('/', expensesController.getExpenses);
expensesRouter.get('/:id', expensesController.getOneExpense);
expensesRouter.post('/', expensesController.postExpense);
expensesRouter.delete('/:id', expensesController.deleteExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUser);
usersRouter.post('/', usersController.postUser);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.patch('/:id', usersController.updateUser);

module.exports = {
  expensesRouter,
  usersRouter,
};
