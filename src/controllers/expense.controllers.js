'use strict';

const constants = require('../constants.js');
const expenseServise = require('../services/expense.service.js');
const userServise = require('../services/user.service.js');

const {
  getExpenseById,
  getFilteredExpenses,
  updateExpense,
  addNewExpense,
  deleteExpense,
} = expenseServise;

const {
  SUCCESS_CODE,
  NOT_FOUND_CODE,
  BAD_REQUEST_CODE,
  SUCCESSFULLY_CREATED_CODE,
  COMPLETED_NO_CONTENT_CODE,

  NOT_FOUND_USER_MESSAGE,

  NOT_FOUND_EXPENSE_MESSAGE,
  UNPROCESSABLE_ENTITY_MESSAGE,
} = constants;

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = getFilteredExpenses(userId, categories, from, to);

  if (!expenses) {
    res.status(NOT_FOUND_CODE);
    res.send(NOT_FOUND_EXPENSE_MESSAGE);
  }

  res.status(SUCCESS_CODE);
  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const requestedExpense = getExpenseById(id);

  if (!requestedExpense) {
    res.status(NOT_FOUND_CODE);
    res.send(NOT_FOUND_EXPENSE_MESSAGE);

    return;
  }

  res.status(SUCCESS_CODE);
  res.send(requestedExpense);
};

const create = (req, res) => {
  const dataForNewExpense = req.body;
  const { userId, spentAt, title, amount, category } = dataForNewExpense;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.status(BAD_REQUEST_CODE);
    res.send(UNPROCESSABLE_ENTITY_MESSAGE);

    return;
  }

  if (!userServise.getUserById(userId)) {
    res.status(BAD_REQUEST_CODE);
    res.send(NOT_FOUND_USER_MESSAGE);

    return;
  }

  const newExpense = addNewExpense(dataForNewExpense);

  res.status(SUCCESSFULLY_CREATED_CODE);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expenseToDelete = getExpenseById(id);

  if (!expenseToDelete) {
    res.status(NOT_FOUND_CODE);
    res.send(NOT_FOUND_EXPENSE_MESSAGE);

    return;
  }

  deleteExpense(expenseToDelete.id);
  res.sendStatus(COMPLETED_NO_CONTENT_CODE);
};

const update = (req, res) => {
  const { id } = req.params;
  const expenseToUpdate = getExpenseById(id);
  const dataToUpdate = req.body;

  if (!expenseToUpdate) {
    res.status(NOT_FOUND_CODE);
    res.send(NOT_FOUND_EXPENSE_MESSAGE);

    return;
  }

  const updatedExpense = updateExpense(id, dataToUpdate);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
