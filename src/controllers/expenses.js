'use strict';

const expensesService = require('../services/expenses');
const userService = require('../services/users');

const getAll = (req, res) => {
  const expenses = expensesService.getAll();

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(+expenseId);

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

  const foundUser = userService.getById(+userId);

  if (
    !foundUser
    || !spentAt
    || !title
    || !amount
    || !category
    || !note
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(userId,
    spentAt,
    title,
    amount,
    category,
    note);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(+expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;
  const foundExpense = expensesService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (
    !spentAt
    || !title
    || !amount
    || !category
    || !note
  ) {
    res.sendStatus(400);

    return;
  }

  expensesService.update(foundExpense,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.send(expensesService.getById(+expenseId));
};

module.exports = {
  getAll, getOne, add, remove, update,
};
