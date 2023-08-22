'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getExpenses = (req, res) => {
  const { userId, from, to, categories } = req.query;

  const filteredExpenses = expenseService
    .getFiltered(userId, from, to, categories);

  res.send(filteredExpenses);
};

const getExpenseById = (req, res) => {
  const expenseId = +req.params.expenseId;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const { title, userId } = req.body;
  const foundUser = userService.getById(userId);

  if (!title || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const createdExpense = expenseService.create(req.body);

  res.status(201).send(createdExpense);
};

const updateExpense = (req, res) => {
  const expenseId = +req.params.expenseId;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if ('id' in req.body) {
    res.sendStatus(400);

    return;
  }

  expenseService.update(expenseId, req.body);

  res.send(foundExpense);
};

const deleteExpense = (req, res) => {
  const expenseId = +req.params.expenseId;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);

  res.sendStatus(204);
};

module.exports = {
  getExpenses, getExpenseById, createExpense, updateExpense, deleteExpense,
};
