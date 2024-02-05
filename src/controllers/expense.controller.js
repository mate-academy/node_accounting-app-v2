'use strict';

const {
  getAllExp,
  addNewExpense,
  findExpense,
  findIndex,
  deleteExp,
  findExp,
  updateExp,
} = require('../services/expense.service');

const { findUser } = require('../services/user.service');

const getAllExpenses = (req, res) => {
  const filteredExpenses = getAllExp(req.query);

  res.status(200).json(filteredExpenses);
};

const postExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (typeof userId !== 'number'
  || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const isUser = findUser(userId);

  if (!isUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = addNewExpense({
    userId, spentAt, title, amount, category, note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const getExpense = (req, res) => {
  const expenseId = req.params.id;
  const foundExpense = findExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(foundExpense);
};

const deleteExpense = (req, res) => {
  const expenseId = req.params.id;
  const index = findIndex(expenseId);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  deleteExp();
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const expenseId = req.params.id;
  const { spentAt, title, amount, category, note } = req.body;

  const foundExpense = findExp(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!spentAt && !title && !amount && !category && !note) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = updateExp({
    foundExpense, spentAt, title, amount, category, note,
  });

  res.status(200).json(updatedExpense);
};

module.exports = {
  getAllExpenses,
  postExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
