'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/user.service');
const { filterByQuery } = require('../utils/filter.expenses');

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.getExpensesById(Number(id));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesService.getExpensesById(Number(id)));
};

const gerAllIncludesQuery = (req, res) => {
  const query = req.query;
  const expenses = expensesService.getAllExpenses();

  if (!Object.keys(query).length) {
    res.send(expenses);

    return;
  }

  const filteredExpenses = filterByQuery(query, expenses);

  res.send(filteredExpenses);
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

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note
    || !usersService.getUserById(userId)
  ) {
    res.sendStatus(400);

    return;
  }

  res.status(201);
  res.send(expensesService.createExpenses(req.body));
};

const deleteParticular = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const deletedUser = expensesService.deleteExpensesById(Number(id));

  if (!deletedUser) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateParticular = (req, res) => {
  const { id } = req.params;

  const updatedUser = expensesService.updateExpensesById(Number(id), req.body);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedUser);
};

module.exports = {
  getById,
  gerAllIncludesQuery,
  createExpense,
  deleteParticular,
  updateParticular,
};
