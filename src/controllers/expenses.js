'use strict';

const expensesServices = require('../services/expenses');
const { getUserById } = require('../services/users');
const { isValidData } = require('../utils/expenses');

const getAllExpenses = (req, res) => {
  const expenses = expensesServices.getAllExpenses();

  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(parseInt(expenseId))) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const data = req.body;
  const foundUser = getUserById(data.userId);

  if (!isValidData(data, req.method) || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.createExpense(data);

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(parseInt(expenseId))) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.removeExpense(expenseId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const data = req.body;

  if (isNaN(parseInt(+expenseId))) {
    res.sendStatus(400);

    return;
  }

  const foundUser = getUserById(data.userId);

  if (!isValidData(data, req.method) || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesServices.updateExpense(expenseId, data);

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
