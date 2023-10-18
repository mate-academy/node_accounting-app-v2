'use strict';

const { STATUS_MESSAGES } = require('../utils/constants');
const userServices = require('../services/users.services.js');
const expensesServices = require('../services/expenses.services.js');

const getAll = (req, res) => {
  res.status(STATUS_MESSAGES.OPERATION_SUCCESSFUL)
    .send(expensesServices.getAll(req.query));
};

const add = (req, res) => {
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
    || !userServices.getUserById(userId)) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  res.status(STATUS_MESSAGES.NEW_RESOURCE_CREATED)
    .send(expensesServices.createExpense(req.body));
};

const getCurrentExpense = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const currentExpense = expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  res.status(STATUS_MESSAGES.OPERATION_SUCCESSFUL)
    .send(currentExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const currentExpense = expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  expensesServices.removeExpense(expenseId);

  res.sendStatus(STATUS_MESSAGES.ITEM_DELETED);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const currentExpense = expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  const updatedExpense = expensesServices.updateExpense(expenseId, req.body);

  res.status(STATUS_MESSAGES.OPERATION_SUCCESSFUL)
    .send(updatedExpense);
};

module.exports = {
  getAll,
  add,
  getCurrentExpense,
  remove,
  update,
};
