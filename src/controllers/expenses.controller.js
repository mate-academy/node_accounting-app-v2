'use strict';

const expenseService = require('../services/expenses.service');
const { getUserById } = require('../services/users.service');
const
  {
    NOT_FOUND,
    BAD_REQUEST,
    NO_CONTENT,
    CREATED,
  } = require('../constants');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(expenseService.getAllExpenses(userId, categories, from, to));
};

const getOneById = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpenseById(+id);

  if (!expense) {
    res.status(NOT_FOUND).send();
  }

  res.send(expense);
};

const create = (req, res) => {
  const newExpense = req.body;
  const { userId } = req.body;

  if (!userId || !getUserById(userId)) {
    res.status(BAD_REQUEST).send();

    return;
  }

  if (!expenseService.getExpenseByUserId(+userId)) {
    res.status(NOT_FOUND).send();

    return;
  }

  const createdExpense = expenseService.createExpense(newExpense);

  res.status(CREATED).send(createdExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const newExpense = req.body;

  if (!newExpense) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.status(NOT_FOUND).send();

    return;
  }

  const updatedExpense = expenseService.updateExpense(id, newExpense);

  if (!updatedExpense) {
    res.status(NOT_FOUND).send();

    return;
  }

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.status(NOT_FOUND).send();

    return;
  }

  expenseService.removeExpense(+id);
  res.status(NO_CONTENT).send();
};

module.exports = {
  getAll,
  getOneById,
  create,
  update,
  remove,
};
