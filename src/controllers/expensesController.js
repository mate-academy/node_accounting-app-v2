/* eslint-disable max-len */
'use strict';

const { expensesService } = require('../services/expensesService');
const { userService } = require('../services/userService');

function getExpenses(req, res) {
  const query = req.query;

  const expenses = expensesService.getAllExpenses(query);

  res.status(200).send(expenses);
};

function getExpense(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.status(404).send('Exprence does not exist');

    return;
  }

  res.status(200).send(foundExpense);
};

function createExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (userId === undefined || !spentAt || !title || amount === undefined || !category || !note) {
    res.status(400).send('Incorrect expense info');

    return;
  }

  if (!userService.getUserById(userId)) {
    res.status(400).send('User is not found');

    return;
  }

  const newExpense = expensesService.addExpense(userId,
    spentAt,
    title,
    amount,
    category,
    note,);

  res.status(201).send(newExpense);
};

function deleteExpense(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Expense does not exist');

    return;
  }

  expensesService.removeExpense(expenseId);

  res.status(204).send();
};

function updateExpense(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Expense is not found');

    return;
  }

  const updExpense = expensesService.updateExpenseInfo(expenseId, req.body);

  res.status(200).send(updExpense);
};

const expensesController = {
  getExpenses, getExpense, createExpense, deleteExpense, updateExpense,
};

module.exports = { expensesController };
