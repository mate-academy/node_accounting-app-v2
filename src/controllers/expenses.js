'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  if (userId) {
    if (!Number.isInteger(+userId)) {
      res.sendStatus(422);

      return;
    }
  }

  if (categories) {
    const isCategoriesValid = typeof categories === 'string'
      || Array.isArray(categories);

    if (!isCategoriesValid) {
      res.sendStatus(422);

      return;
    }
  }

  const expenses = expenseService.getAll(userId, categories, from, to);

  res.send(expenses);
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
  const expense = req.body;
  const { userId } = expense;
  const foundUser = userService.getById(userId);

  if (Object.keys(expense).length < 6 || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(expense);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;

  expenseService.update({
    expenseId,
    data,
  });

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
