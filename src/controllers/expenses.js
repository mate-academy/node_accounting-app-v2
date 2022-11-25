'use strict';

const expensesServices = require('../services/expenses');
const { isValidData } = require('../utils/expenses');

const getAllExpenses = (req, res) => {
  const expenses = expensesServices.getAllExpenses();

  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getExpenseById(expenseId);

  if (typeof +expenseId !== 'number'
    || +expenseId <= 0
  ) {
    res.sendStatus(400);

    return;
  }

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const data = req.body;

  if (!isValidData(data)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.createExpense(data);

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getExpenseById(expenseId);

  if (typeof +expenseId !== 'number'
    || expenseId <= 0
  ) {
    res.sendStatus(400);

    return;
  }

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
  const foundExpense = expensesServices.getExpenseById(expenseId);

  if (typeof +expenseId !== 'number' || !Number.isInteger(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  if (!isValidData(data)) {
    res.sendStatus(400);

    return;
  }

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.updateExpense(expenseId, data);

  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
