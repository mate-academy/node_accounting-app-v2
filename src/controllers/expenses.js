'use strict';

const userService = require('../services/users');
const expenseService = require('../services/expenses');

const getAll = (req, res) => {
  const filters = req.query;
  const expenses = expenseService.getAll(filters);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isDataValid = typeof userId === 'number'
    || typeof spentAt === 'string'
    || typeof title === 'string'
    || typeof amount === 'number'
    || typeof category === 'string'
    || typeof note === 'string';

  const foundUser = userService.findById(userId);

  if (!isDataValid || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const expenseData = req.body;

  const newExpense = expenseService.create(expenseData);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const expenseInfo = req.body;

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.update(expenseId, expenseInfo);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
