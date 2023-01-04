'use strict';

const expenseService = require('../services/expenses');

const getAll = (req, res) => {
  const { userId, category, from, to } = req.params;
  const expenses = expenseService.getAll(userId, category, from, to);

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
  const { ...expense } = req.body;

  if (!expense) {
    res.sendStatus(422);

    return;
  }

  if (typeof expense !== 'object') {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(expense);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(422);

    return;
  }

  const foundUser = expenseService.getById(expenseId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const { ...expense } = req.body;

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (typeof expense !== 'object') {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.update(expenseId, expense);

  res.send(newExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
