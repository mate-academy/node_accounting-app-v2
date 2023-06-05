'use strict';

const expensService = require('../services/expenses.js');

const getAll = (req, res) => {
  const expenses = expensService.getAll();

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expensId } = req.params;
  const foundExpens = expensService.getExpensById(expensId);

  if (!foundExpens) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpens);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpens = expensService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpens);
};

const remove = (req, res) => {
  const { expensId } = req.params;
  const foundExpens = expensService.getExpensById(expensId);

  if (!foundExpens) {
    res.sendStatus(404);

    return;
  }

  expensService.remove(expensId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expensId } = req.params;
  const foundExpens = expensService.getExpensById(expensId);

  if (!foundExpens) {
    res.sendStatus(404);
  }

  const { spentAt, title, amount, category, note } = req.body;

  if (!spentAt && !title && !amount && !category && !note) {
    res.sendStatus(400);
  }

  expensService.update(
    expensId,
    spentAt,
    title,
    amount,
    category,
    note,
  );
  res.send(foundExpens);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
