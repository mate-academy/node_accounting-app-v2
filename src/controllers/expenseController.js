'use strict';

const userServices = require('../services/userServices');
const expenseServices = require('../services/expenseServices');

function getExpenses(req, res) {
  const { userId, categories, from, to } = req.query;
  const expenses = expenseServices.getExpenses(userId, categories, from, to);

  res.send(expenses);
};

function getExpenseById(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expenseServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const foundUser = userServices.getUserById(userId);

  if (!foundUser || !title) {
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
  const { expenseId } = req.params;
  const expense = expenseServices.getExpenseById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.deleteExpense(expenseId);

  res.sendStatus(204);
};

function updateExpense(req, res) {
  const { expenseId } = req.params;
  let expense = expenseServices.getExpenseById(expenseId);

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
