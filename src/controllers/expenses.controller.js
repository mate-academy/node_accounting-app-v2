'use strict';

const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');
const commonService = require('../services/common.service');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(expenseService.getNewExpense(userId, categories, from, to));
};

const createNewExpense = (req, res) => {
  const request = req.body;
  const postExpenseKeys = ['userId', ...expenseService.expenseKeys];
  const allKeys = postExpenseKeys.every((key) => request.hasOwnProperty(key));
  const matchingUser = userService.getUserById(request.userId);

  if (!allKeys || !matchingUser) {
    commonService.sendError(
      res,
      commonService.response.requiredParameter,
      commonService.response.requiredParamaterMessage
    );

    return;
  }

  res.statusCode = 201;
  res.send(expenseService.createNewExpense(request));
};

const getExpenseById = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    commonService.sendError(
      res,
      commonService.response.notFound,
      commonService.response.notFoundMessage
    );

    return;
  }

  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const exists = expenseService.getExpenseById(id);

  if (!exists) {
    commonService.sendError(
      res,
      commonService.response.notFound,
      commonService.response.notFoundMessage
    );

    return;
  }

  expenseService.removeExpenseById(id);

  res.sendStatus(204);
};

const editExpense = (req, res) => {
  const { id } = req.params;
  const request = req.body;
  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    commonService.sendError(
      res,
      commonService.response.notFound,
      commonService.response.notFoundMessage
    );

    return;
  }

  Object.assign(expense, request);
  res.send(expense);
};

module.exports = {
  getExpenses,
  createNewExpense,
  getExpenseById,
  deleteExpense,
  editExpense,
};
