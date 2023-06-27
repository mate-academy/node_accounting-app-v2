'use strict';

const { getUser } = require('../users/services');
const expensesServices = require('./services');

module.exports.createExpense = (req, res) => {
  const expense = req.body;

  if (!expense.title || !getUser(expense.userId)) {
    res.sendStatus(400);

    return;
  }

  const createdExpanse = expensesServices.createExpenses(expense);

  res.statusCode = 201;

  res.send(createdExpanse);
};

module.exports.getExpenses = (req, res) => {
  const {
    userId,
    from,
    to,
    category,
  } = req.query;

  const foundExpenses = expensesServices
    .getExpenses(+userId, from, to, category);

  res.send(foundExpenses);
};

module.exports.getExpense = (req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (isNaN(numId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServices.getExpense(numId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

module.exports.deleteExpense = (req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (isNaN(numId)) {
    res.sendStatus(400);

    return;
  }

  try {
    expensesServices.deleteExpense(numId);

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};

module.exports.updateExpense = (req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (isNaN(numId)) {
    res.sendStatus(400);

    return;
  }

  const body = req.body;

  try {
    const newExpense = expensesServices.updateExpense(numId, body);

    res.send(newExpense);
  } catch (err) {
    res.sendStatus(404);
  }
};
