import {Request, Response} from 'express';

import * as usersServices from '../services/users';
import * as expensesServices from '../services/expenses';
import { Expense } from '../types/expense';

export const getAll = (req: Request, res: Response) => {
  const expenses: Expense[] = expensesServices.getAll();

  return expenses;
};

export const findOne = (req: Request, res: Response) => {
  const { expenseId } = req.params;

  const foundExpense: Expense = expensesServices.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

export const addOne = (req: Request, res: Response) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const foundUser = usersServices.findUserById(userId);

  if (!foundUser || Object.keys(req.body) < 6) {
    res.sendStatus(400);

    return;
  }

  if (typeof userId !== 'number' || typeof spentAt !== 'string'
    || typeof title !== 'string' || typeof amount !== 'number'
    || typeof category !== 'string' || typeof note !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.addOne(req.body);

  res.send(newExpense);
};

export const updateOne = (req: Request, res: Response) => {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesServices.updateOne(expenseId, req.body);

  res.send(updatedExpense);
};

export const deleteOne = (req: Request, res: Response) => {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.deleteOne(expenseId);

  res.sendStatus(204);
};
