'use strict';

const { expenseService } = require('../services/expenses');
const { userService } = require('../services/users');

const getAll = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { userId, categories, from, to } = req.query;

  const expenses = expenseService.getExpenses(userId, categories, from, to);

  res.send(expenses);
};

const getOne = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(422);

    return;
  }

  const foundExpense = expenseService.getExpense(expenseId);

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

  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (isNaN(+userId)
  || !spentAt
  || !title
  || isNaN(+amount)
  || !category
  || !note) {
    res.sendStatus(400);
  }

  const newExpense = expenseService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.status(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const dataToUpdate = req.body;
  const foundExpense = expenseService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.updateExpense({
    id: expenseId,
    dataToUpdate,
  });

  res.send(foundExpense);
};

module.exports = {
  expenseController: {
    getAll,
    getOne,
    add,
    remove,
    update,
  },
};
