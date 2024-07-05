'use strict';

const expenseModel = require('../models/expenseModel');
const userModel = require('../models/userModel');

function createExpense(req, res) {
  const { amount, description, userId } = req.body;

  if (!amount || !description || !userId) {
    return res.status(400).send('Amount, description, and userId are required');
  }

  if (!userModel.getUserById(userId)) {
    return res.status(404).send('User not found');
  }

  const newExpense = expenseModel.createExpense(amount, description, userId);

  res.status(201).json(newExpense);
}

function getAllExpenses(req, res) {
  const expenses = expenseModel.getAllExpenses();

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
  const { amount, description, userId } = req.body;

  if (!amount || !description || !userId) {
    return res.status(400).send('Amount, description, and userId are required');
  }

  const expense = expenseModel.updateExpense(
    parseInt(req.params.id),
    amount,
    description,
    userId,
  );

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
