'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = (req, res) => {
  const { userId, category, from, to } = req.query;
  const expenses = expenseService.getAll(userId, category, from, to);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const foundExpense = expenseService.getById(id);

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

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const foundUser = userService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const foundExpense = expenseService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;

  expenseService.update({
    id,
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
