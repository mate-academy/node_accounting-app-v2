'use strict';

const expenses = require('../services/expenses');

const getAll = (req, res) => {
  const { query } = req;
  const response = expenses.getExpenses(query);

  if (!response) {
    res.sendStatus(400);

    return;
  }
  res.send(response);
};

const addExpense = (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.sendStatus(400);

    return;
  }

  const expense = expenses.setExpenses(req.body);

  if (expense) {
    res.statusCode = 201;
    res.send(expense);

    return;
  }

  res.sendStatus(400);
};

const getOneExpense = (req, res) => {
  const expense = expenses.getExpenseById(req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.send(expense);
};

const changeExpense = (req, res) => {
  const { params, body } = req;
  const expense = expenses.updateExpense(params.id, body);

  if (expense) {
    res.send(expense);

    return;
  }

  res.sendStatus(404);
};

const deleteExpense = (req, res) => {
  const { params } = req;
  const expense = expenses.deleteExpense(params.id);

  if (expense) {
    res.statusCode = 204;
    res.end();

    return;
  }

  res.sendStatus(404);
};

module.exports = {
  getAll,
  getOneExpense,
  addExpense,
  changeExpense,
  deleteExpense,
};
