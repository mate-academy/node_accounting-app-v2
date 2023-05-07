'use strict';

const expensesService = require('../services/ExpensesService');

const getAll = (req, res) => {
  const expenses = expensesService.getAll();

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const expense = expensesService.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
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

  if (
    !userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note
  ) {
    res.sendStatus(422);

    return;
  }

  const newExpense = expensesService.create(
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
  const { expenseId } = req.params;
  const expense = expensesService.getById(expenseId);

  if (!expense) {
    req.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const expense = expensesService.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  expensesService.update({
    id: expenseId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(expense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
