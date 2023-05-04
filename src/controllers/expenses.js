'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = (req, res) => {
  const { userId, from, to, categories } = req.query;
  let copyExpenses = [...expenseService.getAll()];

  if (+userId) {
    copyExpenses = copyExpenses.filter(expense => expense.userId === +userId);
  }

  if (from) {
    copyExpenses = copyExpenses.filter(expense => expense.spentAt >= from);
  }

  if (to) {
    copyExpenses = copyExpenses.filter(expense => expense.spentAt <= to);
  }

  if (categories) {
    copyExpenses
      = copyExpenses.filter(expense => categories.includes(expense.category));
  }

  res.send(copyExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const {
    amount,
    category,
    note,
    spentAt,
    title,
    userId,
  } = req.body;
  const foundUser = userService.getById(userId);

  if (!amount || !category || !note || !spentAt || !title || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(req.body);

  res.status(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

const change = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  expenseService.update(foundExpense, req.body);
  res.send(foundExpense);
};

const reset = () => expenseService.reset();

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  change,
  reset,
};
