'use strict';

const expenseService = require('../services/expenses');
const { getById: getUserById } = require('../services/users');

const getAll = (req, res) => {
  const { userId, category, from, to } = req.query;
  const foundExpenses = expenseService.getAll(userId, category, from, to);

  res.send(foundExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const newExpense = req.body;
  const { userId, spentAt, title, amount, category } = newExpense;
  const foundUser = getUserById(userId);
  const check = !title || !spentAt || !amount || !category || !foundUser;

  if (check) {
    res.sendStatus(400);

    return;
  }

  expenseService.create(newExpense);
  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const foundExpense = expenseService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.update(id, updateData);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
