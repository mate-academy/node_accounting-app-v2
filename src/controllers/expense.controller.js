'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const filteredExpenses = expenseService.filter(+userId, categories, from, to);

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

  if ([userId, spentAt, title, amount, category, note].some(item => !item)
    || !userService.getById(userId)) {
    res.sendStatus(400);
  }

  const newExpens = expenseService.create(
    userId, spentAt, title, amount, category, note
  );

  res.statusCode = 201;
  res.send(newExpens);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expens = expenseService.getById(+id);

  if (!expens) {
    res.sendStatus(404);

    return;
  }

  res.send(expens);
};

const remove = (req, res) => {
  const id = +req.params.id;

  if (!expenseService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const id = +req.params.id;
  const { ...args } = req.body;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const newExpens = expenseService.update(id, args);

  res.send(newExpens);
};

module.exports = {
  get,
  createExpense,
  getById,
  remove,
  update,
};
