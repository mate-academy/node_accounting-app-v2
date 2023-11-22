'use strict';

const {
  getExpensesByQuery,
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  removeExpenseById,
} = require('../services/expenses.service');
const { getUserById } = require('../services/user.servise');

const getAllExpenses = (req, res) => {
  const { userId, from, to, categories, id } = req.query;

  if (id || categories || from || to || userId) {
    const findExpenses = getExpensesByQuery(req.query);

    res.statusCode = 200;
    res.send(findExpenses);

    return;
  }

  res.statusCode = 200;
  res.send(getExpenses());
};

const getOneExpense = (req, res) => {
  const { id } = req.params;

  const findExpense = getExpenseById(id);

  if (!findExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(findExpense);
};

const createExpense = (req, res) => {
  const { userId, title } = req.body;
  const findUser = getUserById(userId);

  if (!findUser || !title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = addExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const updateExpenseInfo = (req, res) => {
  const { id } = req.params;

  const updatedExpense = updateExpense(id, req.body);

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(updatedExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  const findExpense = getExpenseById(id);

  if (!findExpense) {
    res.sendStatus(404);

    return;
  }

  removeExpenseById(id);

  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpenseInfo,
  removeExpense,
};
