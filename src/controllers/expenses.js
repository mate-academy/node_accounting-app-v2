'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = (req, res) => {
  const expenses = expenseService.getAll(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const {
    amount,
    category,
    note,
    spentAt,
    title,
    userId,
  } = req.body;
  const foundUser = userService.getById(userId);

  if (!amount || !category || !note || !spentAt || !title || !foundUser) {
    return res.sendStatus(400);
  }

  const newExpense = expenseService.create(req.body);

  res.status(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

const change = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  expenseService.update(foundExpense, req.body);
  res.send(foundExpense);
};

const reset = () => expenseService.reset();

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  change,
  reset,
};
