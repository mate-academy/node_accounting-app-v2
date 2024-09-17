'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');
const variable = require('../variables/constants');

const getAll = (req, res) => {
  res.send(expensesService.getExpenses(req.query));
};

const getExpense = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(variable.NOT_FOUND);

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
    res.sendStatus(variable.BAD_REQUEST);

    return;
  }

  const expense = {
    id: Number(new Date()),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expensesService.add(expense);

  res.statusCode = variable.CREATED;
  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(variable.NOT_FOUND);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(variable.DELETED);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const toUpdate = req.body;
  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(variable.NOT_FOUND);

    return;
  }

  expensesService.update(id, toUpdate);
  res.statusCode = variable.SUCCESSFUL;

  res.send(expense);
};

module.exports = {
  getAll,
  getExpense,
  addExpense,
  deleteExpense,
  updateExpense,
};
