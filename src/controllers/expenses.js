'use strict';

const expenseService = require('../service/expenses');
const userService = require('../service/users');

const getAll = (req, res) => {
  const { category, from, to, userId } = req.query;

  const filteredExpenses = expenseService.getAll(category, from, to, userId);

  if (!filteredExpenses) {
    res.send(404);

    return;
  }

  res.statusCode = 200;
  res.send(filteredExpenses);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const isUserExist = userService.findById(userId);

  console.log(isUserExist)

  const isValidData = !title || !spentAt || !amount
  || !category || !note || !isUserExist;

  if (isValidData) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(userId, spentAt, title,
    amount, category, note);

  res.statusCode = 201;
  res.send(newExpense);
};

const findById = (req, res) => {
  const { expenseId } = req.params;

  const foundUserExpens = expenseService.findById(expenseId);

  if (!foundUserExpens) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUserExpens);
};

const change = (req, res) => {
  const { expenseId } = req.params;
  const { filed, title } = req.body;

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.change(expenseId, filed, title);

  res.statusCode = 200;
  res.send(foundExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  create,
  findById,
  change,
  remove,
};
