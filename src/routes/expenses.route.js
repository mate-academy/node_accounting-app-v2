'use strict';

const EXPENSES_ROUTES = {
  BASE: '/',
  ID: '/:id',
};

const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const expensesRouter = express.Router();

expensesRouter.get(EXPENSES_ROUTES.BASE, expensesController.get);
expensesRouter.post(EXPENSES_ROUTES.BASE, expensesController.create);
expensesRouter.get(EXPENSES_ROUTES.ID, expensesController.getOne);
expensesRouter.delete(EXPENSES_ROUTES.ID, expensesController.remove);
expensesRouter.patch(EXPENSES_ROUTES.ID, expensesController.update);

module.exports = {
  expensesRouter,
};
