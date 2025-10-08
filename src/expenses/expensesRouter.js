const { Router } = require('express');
const { expensesController } = require('./expensesController');

export const expensesRouter = Router();

expensesRouter.get(`/`, expensesController.getAll);
expensesRouter.get(`/:id`, expensesController.getSingle);
expensesRouter.post(`/`, expensesController.create);
expensesRouter.delete(`/:id`, expensesController.deleteUser);
expensesRouter.patch(`/:id`, expensesController.update);
