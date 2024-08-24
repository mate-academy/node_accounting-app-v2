const expensesService = require('../services/expenses.service');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (!userId || !categories || !from || !to) {
    res.sendStatus(400);

    return;
  }

  res.send(expensesService.getExpenses(userId, categories, from, to));
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  // eslint-disable-next-line no-console
  console.log(req.body);

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  return newExpense;
};

const getExpense = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!expensesService.getExpense(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  if (!id || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.updateExpense(
    spentAt,
    title,
    amount,
    category,
    note,
  );

  return newExpense;
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  removeExpense,
  updateExpense,
};
