'use strict';

const { expenseService } = require('../services/expensesService.js');
const { validateReqBody } = require('../../helpers');
const { userService } = require('../services/userService.js');

function getAllExpenses(req, res) {
  const isMissingQuery = Object.keys(req.query).length === 0;

  if (isMissingQuery) {
    const expenses = expenseService.getExpenses();

    res.status(200).send(expenses);

    return;
  }

  const filteredExpenses = expenseService.filterExpensesByQuery(req.query);

  res.status(200).send(filteredExpenses);
}

function getById(req, res) {
  const { expanseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expanseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundExpense);
}

function add(req, res) {
  const allowedFields = [
    'userId', 'spentAt', 'title', 'amount', 'category', 'note',
  ];
  const validatedRequestBody = validateReqBody(
    req.body, allowedFields
  );

  const { userId, spentAt, title, amount, category } = validatedRequestBody;

  const isUserExist = userService.getUserById(userId);

  if (!isUserExist || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.addExpense(validatedRequestBody);

  res.status(201).send(newExpense);
}

function remove(req, res) {
  const { expanseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expanseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(expanseId);
  res.sendStatus(204);
}

function update(req, res) {
  const { expanseId } = req.params;
  const allowedFields = ['spentAt', 'title', 'amount', 'category', 'note'];
  const requestBody = validateReqBody(
    req.body, allowedFields
  );
  const { spentAt, title, amount, category, note } = requestBody;

  const foundExpense = expenseService.getExpenseById(expanseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!spentAt && !title && !amount && !category && !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService
    .updateExpense(expanseId, requestBody);

  res.status(200).send(newExpense);
}

module.exports = {
  getAllExpenses,
  getById,
  add,
  remove,
  update,
  initExpenses: () => expenseService.resetExpenses(),
};
