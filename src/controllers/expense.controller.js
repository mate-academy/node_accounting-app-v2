'use strict';

const expenseService = require('../services/expenses.service');
const { getUserById } = require('../services/user.service');

const getExpenses = (req, res) => {
  const { userId, from, to, categories } = req.query;
  let expenses = expenseService.getAll();

  if (userId) {
    expenses = expenses.filter(
      expense => expense.userId === +userId
    );
  }

  if (from) {
    expenses = expenses.filter(
      expense => expense.spentAt >= from
    );
  }

  if (to) {
    expenses = expenses.filter(
      expense => expense.spentAt <= to
    );
  }

  if (categories) {
    expenses = expenses.filter(
      expense => categories.includes(expense.category)
    );
  }

  res.send(expenses);
};

const getExpense = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

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

  const idForUser = +userId;

  const userById = getUserById(idForUser);

  if (!userById && userId) {
    res.sendStatus(400);

    return;
  }

  if (!title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenseService.clearExpense(newExpense);

  res.statusCode = 201;

  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const expenseById = expenseService.getById(id);

  if (!expenseById) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const expenseToUpdate = req.body;

  expenseService.update(id, expenseToUpdate);

  res.send(expense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
