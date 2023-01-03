import * as usersService from '../services/users';
import * as expensesService from '../services/expenses';

export const getAll = (req, res) => {
  const expenses = expensesService.getAll();

  return expenses;
};

export const findOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

export const addOne = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const foundUser = usersService.findUserById(userId);

  if (!foundUser || Object.keys(req.body).length < 6) {
    res.sendStatus(400);

    return;
  }

  if (typeof userId !== 'number' || typeof spentAt !== 'string'
    || typeof title !== 'string' || typeof amount !== 'number'
    || typeof category !== 'string' || typeof note !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.addOne(req.body);

  res.send(newExpense);
};

export const updateOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateOne(expenseId, req.body);

  res.send(updatedExpense);
};

export const deleteOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteOne(expenseId);

  res.sendStatus(204);
};
