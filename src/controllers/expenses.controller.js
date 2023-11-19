'use strict';

const {
  getByQuery,
  create,
  remove,
  update,
} = require('../services/expenses.services');
const { getOne } = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const searchQuery = req.query;
  const expenses = getByQuery(searchQuery);

  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = getByQuery({ id })[0];

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const createExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const userExist = getOne(userId);

  if (!userExist || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = create(userId, spentAt, title, amount, category, note);

  res.statusCode = 201;
  res.send(newExpense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = getByQuery({ id })[0];

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = update(id, newData);

  res.setHeader('content-type', 'application/json');
  res.send(updatedExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = getByQuery({ id })[0];

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  remove(id);

  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
