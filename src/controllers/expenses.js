'use strict';

const expenseService = require('../services/expenses.js');

const getAll = (req, res) => {
  const expenses = expenseService(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (typeof expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

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

  if (!userId
      || !spentAt
      || !title
      || !amount
      || !category
      || !note
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.createExpense(req.body);

  res.sendStatus(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.updateExpense(expenseId, req.body);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
