'use strict';

const { userService } = require('../services/users.js');
const { expenseService } = require('../services/expenses.js');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
    category,
  } = req.query;

  let expenses = expenseService.getAll();

  if (userId) {
    expenses = expenseService.filterAllByUserId(userId);
  }

  if (from && to) {
    expenses = expenseService.filterAllByDate(from, to);
  }

  if (category) {
    expenses = expenseService.filterAllByCategory(category);
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expenseService.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId } = req.body;

  if (!Object.keys(req.body).length) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpenses = expenseService.create(req.body);

  res.statusCode = 201;
  res.send(newExpenses);
};

const update = (req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expenseService.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  Object.assign(foundExpense, req.body);

  res.send(foundExpense);
};

const remove = (req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expenseService.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expensesId);

  res.sendStatus(204);
};

module.exports = {
  expenseController: {
    getAll,
    getOne,
    add,
    update,
    remove,
  },
};
