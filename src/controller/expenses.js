'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = (req, res) => {
  // const { userId, categories, from, to } = req.query;

  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const expenses = expenseService.getAll(userId, category, from, to);

  res.send(expenses);
};

const findOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addOne = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;

  if (
    !userService.findUserById(userId)
    || isNaN(Date.parse(spentAt))
    || !title
    || (amount < 0)
    || !category
  ) {
    res.sendStatus(400);

    return;
  };

  const newExpense = expenseService.addExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const patchOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = expenseService.patchExpense(foundExpense, req.body);

  res.statusCode = 200;
  res.send(newExpense);
};

const deleteOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpenseById(expenseId);

  res.sendStatus(204);
};

module.exports = {
  getAll, findOne, addOne, deleteOne, patchOne,
};
