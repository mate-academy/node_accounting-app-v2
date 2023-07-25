'use strict';

const { expenseService } = require('../services/expense.service');
const { userService } = require('../services/user.service');

const getAll = (req, res) => {
  const filteredExpenses = expenseService.getAll(req.query);

  res.send(filteredExpenses);
};

const getById = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId } = req.body;

  const foundUser = userService.getById(Number(userId));

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(req.body);

  res.status(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const expenseToRemove = expenseService.getById(Number(expenseId));

  if (!expenseToRemove) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(Number(expenseId));

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const expenseToUpdate = expenseService(Number(expenseId));

  if (!expenseToUpdate) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = userService.update(Number(expenseId), req.body);

  res.send(updatedExpense);
};

const expenseController = {
  getAll,
  getById,
  add,
  remove,
  update,
};

module.exports = {
  expenseController,
};
