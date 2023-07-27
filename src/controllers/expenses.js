'use strict';

const { expensesService } = require('../services/expenses.js');
const { userService } = require('../services/users.js');

const getExpenses = (req, res) => {
  const { userId, from, to, categories } = req.query;

  const expenses = expensesService.getFiltered(
    userId, from, to, categories,
  );

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const options = req.body;
  const { userId } = options;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(options);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const options = req.body;

  expensesService.update(expenseId, options);

  res.send(foundExpense);
};

const expenseController = {
  getExpenses,
  getOne,
  add,
  remove,
  update,
};

module.exports = { expenseController };
