'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAll = (req, res) => {
  const { from, to, category, userId } = req.query;

  const expenses = expenseService.getAll(from, to, category, userId);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = userService.getById(userId);

  if (!user || !title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService
    .create(title, amount, category, note, userId, spentAt);

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

  const { spentAt, title, amount, category, note } = req.body;

  const updatedExpense = expenseService
    .update(expenseId, spentAt, title, amount, category, note);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
