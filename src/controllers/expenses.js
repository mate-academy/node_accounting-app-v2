'use strict';

const userService = require('../services/users');
const expenseService = require('../services/expenses');

const getAll = (req, res) => {
  const expenses = expenseService.getAll();
  const searchParams = req.query;

  if (!Object.keys(searchParams).length) {
    res.send(expenses);

    return;
  }

  const filteredExpenses = expenseService.getFiltered(searchParams);

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
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

  if (!spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  expenseService.update(foundExpense, req.body);

  res.statusCode = 200;
  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
