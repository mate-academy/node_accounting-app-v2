'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = (req, res) => {
  res.send(expensesService.getExpenses(req.query));
};

const getExpense = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const addExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!usersService.getById(userId)) {
    res.sendStatus(400);

    return;
  }

  const expense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expensesService.add(expense);

  res.statusCode = 201;
  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const isExpense = expensesService.getById(+id);

  if (!isExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(+id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const toUpdate = req.body;
  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.update(id, toUpdate);
  res.statusCode = 200;

  res.send(expense);
};

module.exports = {
  getAll,
  getExpense,
  addExpense,
  deleteExpense,
  updateExpense,
};
