'use strict';

const { getExpensesAll, getExpensesById, createExpenses }
  = require('../services/expensesService');

const getExpenses = (req, res) => {
  const {
    userId, categories, from, to,
  } = req.query;
  const expenses = getExpensesAll({
    userId, categories, from, to,
  });

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  res.send(expenses);
};

const getOnceExpenses = (req, res) => {
  const { id } = req.params;
  const expense = getExpensesById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const creatNewExpenses = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const arePropsValid
  = typeof +userId === 'number'
  && getExpensesById(userId)
  && !isNaN(new Date(spentAt))
  && typeof title === 'string'
  && title
  && typeof amount === 'number'
  && typeof category === 'string'
  && category
  && typeof note === 'string'
  && (typeof note === 'undefined' || typeof note === 'string');

  if (!arePropsValid) {
    res.sendStatus(400);

    return;
  }

  const expense = createExpenses(
    userId, spentAt, title, amount, category, note,
  );

  res.statusCode = 201;
  res.send(expense);
};
const updateExpense = (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  const { spentAt, title, amount, category, note } = req.body;
  const expense = getExpensesById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newUpdateExpense
    = updateExpense(id, spentAt, title, amount, category, note);

  res.send(newUpdateExpense);
};
const removeExpenses = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(204);

    return;
  }

  const expense = getExpensesById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  removeExpenses(+id);
  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getOnceExpenses,
  creatNewExpenses,
  updateExpense,
  removeExpenses,
};
