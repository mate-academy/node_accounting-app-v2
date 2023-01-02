import express from 'express';
import * as expensesController from '../controllers/expensesController';

export const expensesRouter = express.Router();

expensesRouter.get('/expenses', expensesController.getAll);

expensesRouter.get('/expenses/:expenseId', expensesController.findOne);

expensesRouter.post(
  '/expenses',
  express.json(),
  expensesController.addOne
);

expensesRouter.patch(
  '/expenses/:expenseId',
  express.json(),
  expensesController.updateOne,
);

expensesRouter.delete('/expenses/:expenseId', expensesController.deleteOne);
