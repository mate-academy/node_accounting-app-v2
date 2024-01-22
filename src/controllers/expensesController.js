'use strict';

const { getExpensesAll, getExpensesById, createExpenses }
  = require('../services/expensesService');

const getExpenses = (req, res) => {
  const {
    userId, categories, from, to,
  } = req.body;
  const expenses = getExpensesAll({
    userId, categories, from, to,
  });

  if (!expenses) {
    res.status(404);

    return;
  }

  res.send(expenses);
};
const getOnceExpenses = (req, res) => {
  const { id } = req.params;
  const expense = getExpensesById(id);

  if (!expense) {
    res.status(404);

    return;
  }

  if (isNaN(+id)) {
    res.status(400);

    return;
  }

  res.send(expense);
};
const creatNewExpenses = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const arePropsValid
  = typeof userId === 'number'
  && getExpensesById(userId)
  && !isNaN(new Date(spentAt))
  && typeof title === 'string'
  && title
  && typeof amount === 'number'
  && typeof category === 'string'
  && category
  && typeof note === 'string';

  if (!arePropsValid) {
    res.status(400);

    return;
  }

  const cost = createExpenses(userId, spentAt, title, amount, category, note);

  res.status(201);
  res.send(cost);
};
const updateExpense = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const expense = getExpensesById(id);

  if (!expense) {
    res.status(404);

    return;
  }

  if (typeof title !== 'string') {
    res.status(400);

    return;
  }

  const newUpdateUser
    = updateExpense(id, spentAt, title, amount, category, note);

  res.send(newUpdateUser);
};
const removeExpenses = (req, res) => {
  const { id } = req.params;
  const expense = getExpensesById(id);

  if (!expense) {
    res.status(404);
  }

  removeExpenses(id);
  res.status(204);
};

module.exports = {
  getExpenses,
  getOnceExpenses,
  creatNewExpenses,
  updateExpense,
  removeExpenses,
};
