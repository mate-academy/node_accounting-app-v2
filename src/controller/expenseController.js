'use strict';

const { getExpensesAll, getExpensesById, createExpenses, removeExpensesService,
  updateExpense }
  = require('../services/expenseService');
const { getById } = require('../services/usersService');

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
  const findUser = getById(+userId);

  if (!findUser) {
    res.sendStatus(400);

    return;
  }

  const expense = createExpenses(
    userId, spentAt, title, amount, category, note,
  );

  res.statusCode = 201;
  res.send(expense);
};

const patchExpense = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id) || !req.body) {
    res.sendStatus(400);

    return;
  }

  const { spentAt, title, amount, category, note } = req.body;
  const expense = getExpensesById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = updateExpense({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(updatedExpense);
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

  removeExpensesService(+id);
  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getOnceExpenses,
  creatNewExpenses,
  patchExpense,
  removeExpenses,
};
