import * as expensesService from '../services/expenses.service.js';

export const getExpenses = (req, res) => {
  res.send(expensesService.getAllExpenses());
};

export const getByIdExpenses = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.send(expense);
};

export const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(id);

  res.sendStatus(204);
};

export const addExpenses = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpens = expensesService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(newExpens);
};

export const patchExpenses = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expens = expensesService.getExpenseById(id);

  if (!spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  if (
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    typeof note !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  if (!expens) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpense({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedExpense);
};
