'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');
const {
  NOT_FOUND,
  NO_CONTENT,
  UNPROCESSABLE_CONTENT,
  BAD_REQUEST,
  CREATED,
} = require('../constants/statuses.js');

const get = (req, res) => {
  const { query } = req;
  const expensesFromServer = expensesService.getExpenses();

  if (!Object.keys(query).length) {
    res.send(expensesFromServer);

    return;
  }

  const expensesByQuery = expensesService.getExpenseByQuery(query);

  res.send(expensesByQuery);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isUserExist = usersService.getUserById(userId);
  const allValuesExist = userId
    && spentAt
    && title
    && amount
    && category
    && note
    && isUserExist;

  if (!allValuesExist) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const expense = expensesService.createExpense(req.body);

  res.status(CREATED).send(expense);
};

const remove = (req, res) => {
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

  expensesService.deleteExpense(id);

  res.sendStatus(NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  const newData = expensesService.updateExpense(expense, req.body);

  newData ? res.send(newData) : res.sendStatus(UNPROCESSABLE_CONTENT);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
