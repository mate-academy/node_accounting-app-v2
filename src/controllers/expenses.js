'use strict';

const expensesService = require('../services/expenses');

const getExpenses = (req, res) => {
  const expenses = expensesService.getAllExpenses();

  res.send(expenses);
};

const getExpensesById = (req, res) => {
  const { expensesId } = req.params;
  const foundExpenses = expensesService.getExpenseById(expensesId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpenses);
};

const addExpenses = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpenses(req.body);

  res.status(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expensesId } = req.params;
  const foundExpenses = expensesService.getExpenseById(expensesId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpenses(foundExpenses);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!expenseId || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.updateExpenses({
    id: expenseId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(foundExpense);
};

module.exports = {
  getExpenses,
  getExpensesById,
  addExpenses,
  remove,
  updateExpense,
};
