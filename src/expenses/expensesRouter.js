const { Router } = require('express');
const { expensesController } = require('./expensesController');

const expensesRouter = Router();

expensesRouter.get(`/`, expensesController.getAll);
expensesRouter.get(`/:id`, expensesController.getSingle);
expensesRouter.post(`/`, expensesController.create);
expensesRouter.delete(`/:id`, expensesController.deleteExpense);
expensesRouter.patch(`/:id`, expensesController.update);

module.exports = {
  expensesRouter,
};
