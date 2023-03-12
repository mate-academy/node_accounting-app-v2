'use strict';

const expenseService = require('./../services/expenses');
const userService = require('./../services/users');

const getAll = (req, res) => {
  const filters = req.query;
  const filteredExpenses = expenseService.getAll(filters);

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = (req, res) => {
  const data = req.body;
  const { name, userId } = req.body;

  if (name === 'undefined') {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getOne(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(data);

  res.status(201);
  res.send(newExpense);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;
  const updatedExpense = expenseService.update(foundExpense, data);

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
