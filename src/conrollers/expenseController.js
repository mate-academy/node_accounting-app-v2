'use strict';

const userServices = require('../servises/userServices');
const expenseServices = require('../servises/expenseServices');

function getExpenses(req, res) {
  const { userId, categories, from, to } = req.query;
  const expenses = expenseServices.getExpenses(userId, categories, from, to);

  res.send(expenses);
};

function getExpenseById(req, res) {
  const foundExpense = expenseServices.getExpenseById(req.params.expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
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

  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.status(201);
  res.send(newExpense);
};

function deleteExpense(req, res) {
  const expense = expenseServices.getExpenseById(req.params.expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.deleteExpense(req.params.expenseId);

  res.sendStatus(204);
};

function updateExpense(req, res) {
  let expense = expenseServices.getExpenseById(req.params.expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expense = expenseServices.updateExpense(expense, req);

  res.send(expense);
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
