'use strict';

const expensesService = require('../services/expensesService');
const userService = require('../services/userService');
const { NO_CONTENT, NOT_FOUND, BAD_REQUEST, CREATED } = require('../constants');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(expensesService.getExpenses(userId, categories, from, to));
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const newExpenses = req.body;

  if (!userService.getUserById(newExpenses.userId)) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  res.status(CREATED).send(expensesService.createExpenses(newExpenses));
};

const remove = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  expensesService.deleteExpense(id);
  res.sendStatus(NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const newExpense = req.body;

  if (!newExpense) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  const updatedExpense = expensesService.updateExpense(id, newExpense);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
