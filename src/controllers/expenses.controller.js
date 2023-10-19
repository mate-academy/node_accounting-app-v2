'use strict';

const usersServise = require('../servises/users.service');
const expenseService = require('../servises/expenses.service');
const STATUS = require('../variables');

const getAllExpenses = (req, res) => {
  const { query } = req;
  const expenses = expenseService.getAll({ query });

  res.send(expenses);
};

const createExpence = (req, res) => {
  const { body } = req;

  const user = usersServise.getUser(body.userId);

  if (!user) {
    res.sendStatus(STATUS.ERROR_BAD_REQUEST);

    return;
  }

  const expense = expenseService.addNewExpense(body);

  res.statusCode = STATUS.SUCCESSFUL_CREATED;

  res.send(expense);
};

const findExpenceById = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getExpense(id);

  if (!expense) {
    res.sendStatus(STATUS.ERROR_NOT_FOUND);

    return;
  }

  res.send(expense);
};

const removeExpence = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getExpense(id);

  if (!expense) {
    res.sendStatus(STATUS.ERROR_NOT_FOUND);

    return;
  }

  expenseService.removeExpense(id);

  res.sendStatus(STATUS.SUCCESSFUL_NO_CONTENT);
};

const updateExpence = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!id || !body) {
    res.sendStatus(STATUS.ERROR_BAD_REQUEST);

    return;
  }

  const expense = expenseService.updateExpense(id, body);

  if (!expense) {
    res.sendStatus(STATUS.ERROR_NOT_FOUND);

    return;
  }

  res.send(expense);
};

module.exports = {
  getAllExpenses,
  createExpence,
  findExpenceById,
  removeExpence,
  updateExpence,
};
