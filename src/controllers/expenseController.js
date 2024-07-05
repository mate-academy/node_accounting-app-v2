/* eslint-disable eqeqeq */
'use strict';

const expenseModel = require('../models/expenseModel');
const userModel = require('../models/userModel');

function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!spentAt || !title || !amount || !category || !note || !userId) {
    return res.status(400).send('All fields are required');
  }

  const user = userModel.getUserById(userId);

  if (!user) {
    return res.status(400).send('Bad Request');
  }

  const newExpense = expenseModel.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(newExpense);
}

function getAllExpenses(req, res) {
  const expenses = expenseModel.getAllExpenses(req.query);

  res.json(expenses);
}

function getExpenseById(req, res) {
  const expense = expenseModel.getExpenseById(parseInt(req.params.id));

  if (!expense) {
    return res.status(404).send('Expense not found');
  }
  res.json(expense);
}

function updateExpense(req, res) {
  const expense = expenseModel.updateExpense({
    ...req.body,
    id: parseInt(req.params.id),
  });

  if (!expense) {
    return res.status(404).send('Expense not found');
  }
  res.json(expense);
}

function deleteExpense(req, res) {
  const success = expenseModel.deleteExpense(parseInt(req.params.id));

  if (!success) {
    return res.status(404).send('Expense not found');
  }
  res.status(204).send();
}

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
