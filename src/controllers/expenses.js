'use strict';

const expenseServise = require('../services/expenses.js');

const userServise = require('../services/users');

const getAllExpenses = (req, res) => {
  const expenses = expenseServise.getAllExpenses();
  const { userId, category, from, to } = req.query;

  if (category) {
    const foundExpenses = expenseServise.filter(
      (expense) => expense.category === category
    );

    res.statusCode = 200;

    res.send(foundExpenses);

    return;
  }

  if (userId) {
    const foundExpenses = expenseServise.filter(
      (expense) => expense.userId === Number(userId)
    );

    res.statusCode = 200;

    res.send(foundExpenses);

    return;
  }

  if (!expenses.length) {
    res.send([]);

    return;
  }

  if (from && to) {
    const foundExpenses = expenseServise.filter(
      (expense) => expense.spentAt >= from && expense.spentAt <= to
    );

    res.statusCode = 200;

    res.send(foundExpenses);

    return;
  }

  res.statusCode = 200;

  res.send(expenseServise.getAllExpenses());
};

const addExpense = (req, res) => {
  const { userId } = req.body;

  const foundUser = userServise.getUserById(userId);

  if (!foundUser) {
    res.statusCode = 400;

    res.send();

    return;
  }

  const newExpense = {
    id: expenseServise.getAllExpenses().length + 1,
    ...req.body,
  };

  expenseServise.add(newExpense);

  res.statusCode = 201;

  res.send(newExpense);
};

const getExpenseById = (req, res) => {
  const expenseId = Number(req.params.id);

  const foundExpense = expenseServise.getExpenseById(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;

    res.send();

    return;
  }

  res.statusCode = 200;

  res.send(foundExpense);
};

const removeExpenseById = (req, res) => {
  const expenseId = Number(req.params.id);

  const filteredExpenses = expenseServise.getExpenseById(expenseId);

  if (!filteredExpenses) {
    res.statusCode = 404;

    res.send();

    return;
  }

  expenseServise.removeExpenseById(expenseId);

  res.statusCode = 204;

  res.send();
};

const updateExpenseById = (req, res) => {
  const expenseId = Number(req.params.id);

  const foundExpense = expenseServise.getExpenseById(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;

    res.send();

    return;
  }

  Object.assign(foundExpense, req.body);

  res.statusCode = 200;

  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  addExpense,
  getExpenseById,
  removeExpenseById,
  updateExpenseById,
};
