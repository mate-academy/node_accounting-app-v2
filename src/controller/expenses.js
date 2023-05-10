'use strict';

const usersServices = require('../services/users.js');
const expensesService = require('../services/expenses.js');

const getAllExpenses = (req, res) => {
  const expenses = expensesService.getAllExpenses();

  res.send(expenses);
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;
  const expenseById = expensesService.getExpenseById(expenseId);

  if (!expenseById) {
    res.status(404).send('Expense not found');

    return;
  }
  res.send(expenseById);
};

const createExpense = (req, res) => {
  const { id, userId, spentAt, title, amount, category, note } = req.body;

  const usercheck = usersServices.getUserById(userId);

  if (!usercheck) {
    res.status(400).send('User not found');

    return;
  }

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.status(400).send('All fields are required');

    return;
  }

  const newExpense = expensesService.createExpense(
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const expenseById = expensesService.getExpenseById(expenseId);

  if (!expenseById) {
    res.status(404).send('Expense not found');

    return;
  }
  expensesService.deleteExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const requestedExpense = expensesService.getExpenseById(expenseId);

  if (!requestedExpense) {
    res.status(404).send('Expense not found');

    return;
  }

  const { spentAt, title, amount, category, note } = req.body;
  const fieldsToUpdate = {
    spentAt,
    title,
    amount,
    category,
    note,
  };

  for (const field in fieldsToUpdate) {
    if (fieldsToUpdate[field] !== undefined) {
      requestedExpense[field] = fieldsToUpdate[field];
    }
  }

  res.send(requestedExpense);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
