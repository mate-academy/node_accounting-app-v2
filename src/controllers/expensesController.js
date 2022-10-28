import * as expensesServices from '../services/expensesService.js';

export const getExpenses = (req, res) => {
  res.send(expensesServices.getExpenses());
};

export const getExpense = (req, res) => {
  const { expenseId } = req.params;

  const searchExpense = expensesServices.getExpense(expenseId);

  if (!searchExpense) {
    res.sendStatus(400);

    return;
  }

  res.send(searchExpense);
};

export const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId
      || !spentAt
      || !title
      || !amount
      || !category
      || !note
  ) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesServices.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(expense);
};

export const removeExpense = (req, res) => {
  const { expenseId } = req.params;

  const searchExpense = expensesServices.getExpense(expenseId);

  if (!searchExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.removeUser(expenseId);

  res.sendStatus(204);
};

export const updateExpence = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);
  }

  const foundExpense = expensesServices.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);
  }

  expensesServices.updateExpense(expenseId, req.body);

  res.send(foundExpense);
};
