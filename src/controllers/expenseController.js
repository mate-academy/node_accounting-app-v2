'use strict';

const expenseService = require('../services/expenseService');
const { getUserById } = require('../services/userService');

const getExpenses = (req, res) => {
  const filterBy = req.query;
  const filteredExpenses = expenseService.getExpenses(filterBy);

  res.status(200).send(filteredExpenses);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = getUserById(userId);

  if (
    !user
    || [userId, spentAt, title, amount, category, note].some(x => !x)
  ) {
    res.status(400).send('All fields are required');
  }

  const createdExpense = expenseService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(createdExpense);
};

const getExpense = (req, res) => {
  const id = +req.params.id;
  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.status(404).send('Not Found');
  }

  res.status(200).send(expense);
};

const deleteExpense = (req, res) => {
  const id = +req.params.id;

  if (!expenseService.getExpenseById(id)) {
    res.status(404).send('Expense Not Found');
  }

  expenseService.deleteExpense(id);
  res.status(204).send('Successfully deleted');
};

const updateExpense = (req, res) => {
  const id = +req.params.id;
  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.status(404).send('Expense Not Found');
  }

  const updatedExpense = expenseService.updateExpense(id, req.body);

  res.status(200).send(updatedExpense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
