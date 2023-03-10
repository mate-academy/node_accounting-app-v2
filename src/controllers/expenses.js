'use strict';

const userService = require('../services/users.js');
const expenseService = require('../services/expenses.js');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let expenses = expenseService.getAll();

  if (userId) {
    expenses = expenseService.filterAllByUserId(userId);
  }

  if (from && to) {
    expenses = expenseService.filterAllByDate(from, to);
  }

  if (categories) {
    expenses = expenseService.filterAllByCategory(categories);
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
  const data = req.body;

  if (!Object.keys(data).length) {
    res.sendStatus(400);

    return;
  }

  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = data;

  const dataIsValid = typeof spentAt === 'string'
    || typeof title === 'string'
    || typeof amount === 'number'
    || typeof category === 'string'
    || typeof note === 'string';

  if (!dataIsValid) {
    throw new Error('Data is not valid');
  }

  const isUser = userService.getById(userId);

  if (!isUser) {
    res.sendStatus(400);

    return;
  }

  const newExpenses = expenseService.create(data);

  res.statusCode = 201;
  res.send(newExpenses);
};

const update = (req, res) => {
  const { expensesId } = req.params;
  const data = req.body;

  const foundExpense = expenseService.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  Object.assign(foundExpense, data);

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
  getAll,
  getOne,
  add,
  update,
  remove,
};
