'use strict';

const {
  getExpenses,
  getExpenseById,
  getExpenseByUserId,
  addExpense,
  removeExpense,
  updateExpense,
} = require('../services/expenses');

const getExpensesController = (_, res) => {
  const expenses = getExpenses();

  res.send(expenses);
};

const getExpenseByIdController = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = getExpenseById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const getExpenseByUserIdController = (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    res.sendStatus(400);
  }

  const expenses = getExpenseByUserId(+userId);

  if (!expenses) {
    return res.sendStatus(404);
  }

  res.send(expenses);
};

const addExpenseController = (req, res) => {
  const { userId, title, amount, category, note } = req.body;

  if (!userId || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = addExpense(+userId, title, +amount, category, note);

  const { id } = newExpense;
  const createdExpense = getExpenseById(id);

  if (!createdExpense) {
    return res.sendStatus(500);
  }

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpenseController = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const expense = getExpenseById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  removeExpense(+id);

  res.sendStatus(204);
};

const updateExpenseController = (req, res) => {
  const { id } = req.params;
  const { spendAt, title, amount, category, note } = req.body;

  if (!id || !spendAt || !title || !amount || !category || !note) {
    res.sendStatus(400);
  }

  const expense = updateExpense(id, spendAt, title, +amount, category, note);

  const updatedExpense = getExpenseById(+id);

  if (!updatedExpense) {
    return res.sendStatus(500);
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
