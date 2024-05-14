'use strict';

const expensesService = require('../services/expenses.services');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = expensesService.getExpenses(userId, categories, from, to);

  res.status(200).json(expenses);
};

const getExpenseById = (req, res) => {
  try {
    const { id } = req.params;
    const expense = expensesService.getExpenseById(id);

    res.status(200).json(expense);
  } catch (error) {
    res.sendStatus(404);
  }
};

const addExpense = (req, res) => {
  const userId = parseInt(req.body.userId);

  const expenseData = req.body;

  try {
    const expense = expensesService.addExpense(userId, expenseData);

    res.status(201).json(expense);
  } catch (error) {
    res.sendStatus(400);
  }
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  try {
    expensesService.deleteExpense(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const expenseData = req.body;

  try {
    const expense = expensesService.updateExpense(id, expenseData);

    res.status(200).json(expense);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = {
  getExpenses,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
