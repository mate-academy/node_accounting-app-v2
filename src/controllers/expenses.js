'use strict';

const expensesService = require('../services/expenses');
const userService = require('../services/users');

const add = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;

  const gottenUser = userService.getById(userId);

  const isValidData = gottenUser
    && typeof spentAt === 'string'
    && typeof title === 'string'
    && typeof amount === 'number'
    && typeof category === 'string';

  if (!isValidData) {
    res.sendStatus(400);

    return;
  }

  const userData = req.body;
  const newExpense = expensesService.create(userData);

  res.statusCode = 201;
  res.send(newExpense);
};

const getAll = (req, res) => {
  const expenses = expensesService.filterAll(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const gottenExpense = expensesService.getById(expenseId);

  if (!gottenExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(gottenExpense);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const gottenExpense = expensesService.getById(expenseId);

  if (!gottenExpense) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;

  expensesService.update(expenseId, data);
  res.send(gottenExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const gottenExpense = expensesService.getById(expenseId);

  if (!gottenExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

module.exports = {
  add,
  getAll,
  getOne,
  update,
  remove,
};
