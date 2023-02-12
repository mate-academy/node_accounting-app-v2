import express from 'express';
import * as ExpensesController from '../expenses/expenses.controller';

export const expensesRouter = express.Router();

expensesRouter.get('/', ExpensesController.getAll);
expensesRouter.post('/', ExpensesController.create);
expensesRouter.get('/:id', ExpensesController.getById);
expensesRouter.delete('/:id', ExpensesController.remove);
expensesRouter.patch('/:id', ExpensesController.update);
