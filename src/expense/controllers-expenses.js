'use strict';

const expSv = require('./services-expenses.js');

const getAll = (req, res) => {
  res.statusCode = 200;

  res.send(expSv.getAll());
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;

  if (expSv.isIdNormal(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const findedExpense = expSv.getById(expenseId);

  if (!findedExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(findedExpense);
};

const createExpense = (req, res) => {
  const isNormalReqBody = Object.keys(req.body)
    .every(field => expSv.expensesField.includes(field));

  if (isNormalReqBody) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expSv.create(req.body);

  if (!newExpense) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  if (!expSv.remove(expenseId)) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;

  if (!Number(expenseId) && +expenseId !== 0) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expSv.getById(expenseId);

  if (!updateExpense) {
    res.sendStatus(404);

    return;
  }

  Object.assign(updatedExpense, req.body);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
