'use strict';

const expensesService = require('../services/expenses.service');

const expensesKeys = [
  'userId',
  'spentAt',
  'title',
  'amount',
  'category',
];

const checkKeys = (expense) => expensesKeys
  .every(item => expense.hasOwnProperty(item));

const getAllExpenses = (req, res) => {
  res.status(200).send(expensesService.getAllExpenses(req.query));
};

const getOneExpenses = (req, res) => {
  const expenses = expensesService.getByIdExpenses(+req.params.id);

  if (!expenses) {
    res.status(404).send('exp not found');

    return;
  }

  return res.status(200).send(expenses);
};

const createExpenses = (req, res) => {
  const expenses = req.body;

  if (!checkKeys(expenses)) {
    res.status(400).send('Invalid props');

    return;
  }

  return res.status(201).send(expensesService.createExpenses(expenses));
};

const removeExpenses = (req, res) => {
  if (!expensesService.getByIdExpenses(+req.params.id)) {
    res.status(404).send('Expense not found');

    return;
  }

  expensesService.removeExpenses(+req.params.id);

  return res.sendStatus(204);
};

const updateExpenses = (req, res) => {
  const id = +req.params.id;
  const newExpense = req.body;

  if (!expensesService.getByIdExpenses(id)) {
    res.status(400).send('expense not found');

    return;
  }

  const expense = expensesService.updateExpenses(id, newExpense);

  res.status(204).send(expense);
};

module.exports = {
  removeExpenses,
  updateExpenses,
  createExpenses,
  getOneExpenses,
  getAllExpenses,
};
