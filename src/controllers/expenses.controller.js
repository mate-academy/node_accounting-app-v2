const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(expensesService.getExpenses(userId, categories, from, to));
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    !spentAt ||
    !title ||
    !amount ||
    !category ||
    !note ||
    !usersService.getUser(userId)
  ) {
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

  res.status(201).send(newExpense);
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

  if (!id || req.body.length === 0) {
    res.sendStatus(400);

    return;
  }

  if (!expensesService.getExpense(id)) {
    res.sendStatus(404);

    return;
  }

  const newExpense = expensesService.updateExpense(id, req.body);

  res.send(newExpense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  removeExpense,
  updateExpense,
};
