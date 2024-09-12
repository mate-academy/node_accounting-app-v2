'use strict';

const expensService = require('../services/expenses.js');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expensService.getAll({
    userId,
    categories,
    from,
    to,
  });

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensService.getExpensById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpens = expensService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201);
  res.send(newExpens);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensService.getExpensById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensService.getExpensById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { spentAt, title, amount, category, note } = req.body;

  if (!spentAt && !title && !amount && !category && !note) {
    res.sendStatus(400);

    return;
  }

  expensService.update(
    expenseId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
