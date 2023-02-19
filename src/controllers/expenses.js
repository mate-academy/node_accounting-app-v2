'use strict';

const {
  getExpenses,
  getExpenseById,
  getExpenseByUserId,
  addExpense,
  removeExpense,
  updateExpense,
} = require('../services/expenses');

const getExpensesController = (req, res) => {
  const expenses = getExpenses();

  if (expenses.length === 0) {
    return res.status(404).send('No expenses found');
  }

  res.send(expenses);
};

const getExpenseByIdController = (req, res) => {
  const { id } = req.params;
  const expense = getExpenseById(+id);

  if (!expense) {
    return res.status(404).send('No expense found');
  }

  res.send(expense);
};

const getExpenseByUserIdController = (req, res) => {
  const { userId } = req.query;
  const expenses = getExpenseByUserId(+userId);

  if (!expenses) {
    return res.status(404).send('No expenses found');
  }

  res.send(expenses);
};

const addExpenseController = (req, res) => {
  const { userId, title, amount, category, note } = req.body;

  if (!userId || !title || !amount || !category || !note) {
    res.status(400);

    return;
  }

  const newExpense = addExpense(+userId, title, +amount, category, note);

  res.status(201).send(newExpense);
};

const removeExpenseController = (req, res) => {
  const { id } = req.params;

  const expense = removeExpense(+id);

  if (!expense) {
    return res.status(404).send('No expense found');
  }

  res.send(expense);
};

const updateExpenseController = (req, res) => {
  const { id } = req.params;
  const { userId, spendAt, title, amount, category, note } = req.body;

  const expense = updateExpense(
    id,
    userId,
    spendAt,
    title,
    +amount,
    category,
    note
  );

  if (!expense) {
    return res.status(404);
  }

  res.send(expense);
};

module.exports = {
  getExpensesController,
  getExpenseByIdController,
  getExpenseByUserIdController,
  addExpenseController,
  removeExpenseController,
  updateExpenseController,
};
