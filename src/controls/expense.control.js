import * as expensesService from '../services/expens.service.js';

export const getExpenses = (req, res) => {
  res.send(expensesService.getAllexpenses());
};

export const getByIdExpenses = (req, res) => {
  const { id } = req.params;
  const expens = expensesService.getExpensesById(id);

  if (!expens) {
    res.sendStatus(404);

    return;
  }
  res.send(expens);
};

export const removeExpenses = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getExpensesById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.deletExpenses(id);

  res.sendStatus(204);
};

export const addExpenses = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const expens = expensesService.createExpenses(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expens);
};

export const patchExpenses = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expens = expensesService.getExpensesById(id);

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

  const updatedExpense = expensesService.uptatedExpense({
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedExpense);
};
