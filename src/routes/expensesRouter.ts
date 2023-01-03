import express from 'express';
import * as expensesController from '../controllers/expensesController';

export const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);

expensesRouter.get('/:expenseId', expensesController.findOne);

expensesRouter.post('/', expensesController.addOne);

expensesRouter.patch('/:expenseId', expensesController.updateOne);

expensesRouter.delete('/:expenseId', expensesController.deleteOne);
