'use strict';

const statusCode = require('../constants/statusCodes');
const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');
const { isIdValid } = require('../helpers/isIdValid');
const {
  isNewExpenseValid,
  isUpdateExpenseValid,
} = require('../helpers/expenseHelper');
const BAD_REQUEST_MESSAGE = 'Bad request';

const getExpenses = (req, res) => {
  res.status(statusCode.OK);
  res.send(expenseService.getExpenses(req.query));
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  if (!id || !isIdValid(id)) {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);

    return;
  }

  try {
    const Expense = expenseService.getExpenseById(+id);

    res.status(statusCode.OK);
    res.send(Expense);
  } catch (ex) {
    res.status(statusCode.NOT_FOUND);
    res.send(ex.message);
  }
};

const createExpense = (req, res) => {
  const expense = req.body;

  try {
    if (!isNewExpenseValid(expense)
      || !userService.getUserById(+expense.userId)) {
      res.status(statusCode.BAD_REQUEST);
      res.send(BAD_REQUEST_MESSAGE);

      return;
    }
  } catch (ex) {
    res.status(statusCode.BAD_REQUEST);
    res.send(ex.message);

    return;
  }

  res.status(statusCode.CREATED);
  res.send(expenseService.createExpense(expense));
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!isIdValid(id)) {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);
  }

  try {
    expenseService.deleteExpense(+id);
    res.sendStatus(statusCode.NO_CONTENT);
  } catch (ex) {
    res.status(statusCode.NOT_FOUND);
    res.send(ex.message);
  }
};

const changeExpense = (req, res) => {
  const { id } = req.params;
  const updatedExpenseFields = req.body;

  if (!isIdValid(id) || !isUpdateExpenseValid(updatedExpenseFields)) {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);
  }

  try {
    const changedExpense
      = expenseService.changeExpense(updatedExpenseFields, +id);

    res.status(statusCode.OK);
    res.send(changedExpense);
  } catch (ex) {
    res.status(statusCode.NOT_FOUND);
    res.send(ex.message);
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  changeExpense,
  deleteExpense,
  createExpense,
};
