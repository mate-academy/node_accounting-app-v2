'use strict';

const { getOneUser } = require('../services/users');

const {
  getFilteredExpenses,
  getExpenses,
  addExpense,
  getOneExpense,
  deleteExpense,
  changeExpense,
} = require('../services/expenses');

const getAllExpenses = (req, res) => {
  if (req.query) {
    res.send(getFilteredExpenses(req.query));

    return;
  }

  res.send(getExpenses());
};

const createExpense = (req, res) => {
  const foundedUser = getOneUser(req.body.userId);

  if (!foundedUser) {
    res.sendStatus(400);
    res.end();

    return;
  }

  res.statusCode = 201;
  res.send(addExpense(req.body));
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundedExpense = getOneExpense(+expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundedExpense = getOneExpense(+expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  deleteExpense(+expenseId);
  res.sendStatus(204);
};

const modifyExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundedExpense = getOneExpense(+expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  res.send(changeExpense(+expenseId, req.body));
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  removeExpense,
  modifyExpense,
};
