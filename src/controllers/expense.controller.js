'use strict';

const expenseService = require('../services/expense.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.params;
  const filteredExpenses = expenseService.filter(userId, categories, from, to);

  res.send(filteredExpenses);
};

const createExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if ([userId, spentAt, title, amount, category, note].some(item => !item)) {
    res.sendStatus(422);
  }

  const newExpens = expenseService.create(
    userId, spentAt, title, amount, category, note
  );

  res.statusCode = 201;
  res.send(newExpens);
};

const getById = (req, res) => {
  const { id } = req.params;

  const expens = expenseService.getById(id);

  if (!expens) {
    res.sendStatus(404);

    return;
  }

  res.send(expens);
};

const remove = (req, res) => {
  const { id } = req.params;

  expenseService.remove(id);

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const newExpens = expenseService.update({
    id, spentAt, title, amount, category, note,
  });

  res.send(newExpens);
};

module.exports = {
  get,
  createExpense,
  getById,
  remove,
  update,
};
