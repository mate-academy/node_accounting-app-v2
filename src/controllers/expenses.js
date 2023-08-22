'use strict';
/* eslint-disable max-len */

const {
  getFilteredExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
} = require('../services/expenses.service');
const { getUserById } = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const query = req.query;

  const filteredExpenses = getFilteredExpenses(query);

  res.send(filteredExpenses);
};

const getOneExpense = (req, res) => {
  const { id } = req.params;
  const foundExpense = getExpenseById(parseInt(id));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const userExists = getUserById(userId);

  if (!userExists) {
    res.sendStatus(400);

    return;
  }

  const newExpense = createExpense(userId, spentAt, title, amount, category, note);

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }

  deleteExpense(id);

  res.sendStatus(204);
};

const patchExpense = (req, res) => {
  const { id } = req.params;
  const foundExpense = getExpenseById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { body } = req;

  const updatedExpense = updateExpense(id, body);

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  addExpense,
  removeExpense,
  patchExpense,
};
