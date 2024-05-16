const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const validationMiddleware = require('../middleware/validationMiddleware');
const { handleErrors } = require('../middleware/handleErrorsMiddleware');

const expensesRouter = express.Router();

expensesRouter.get('/', handleErrors(expensesController.getAll));

expensesRouter.post(
  '/',
  validationMiddleware.validateExpenseInput,
  handleErrors(expensesController.createExpense),
);

expensesRouter.get(
  '/:id',
  validationMiddleware.validateId,
  handleErrors(expensesController.getById),
);

expensesRouter.delete(
  '/:id',
  validationMiddleware.validateId,
  handleErrors(expensesController.removeExpense),
);

expensesRouter.patch(
  '/:id',
  validationMiddleware.validateId,
  handleErrors(expensesController.updateExpense),
);

module.exports = {
  expensesRouter,
};
