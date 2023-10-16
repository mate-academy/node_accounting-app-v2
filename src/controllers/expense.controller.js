'use strict';

const expenseService = require('../services/expense.service');
const usersService = require('../services/users.service');

const getFilteredExpenses = (req, res) => {
  const expenses = expenseService.getAllExpenses(req.query);

  res.send(expenses);
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.status(400).send('Data Not Found');

    return;
  }

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Expense Not Found');

    return;
  }

  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const {
    userId,
    title,
    spentAt,
    amount,
    category,
  } = req.body;

  if (!userId || !title || !spentAt || !amount || !category) {
    res.status(400).send('Not all data is provided');

    return;
  }

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.status(400).send('User Not Found');

    return;
  }

  const newExpense = expenseService.createExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Expense Not Found');

    return;
  }

  expenseService.removeExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Expense Not Found');

    return;
  }

  const updateData = { ...req.body };

  expenseService.updateExpense(expenseId, updateData);
  res.send(foundExpense);
};

module.exports = {
  getFilteredExpenses,
  getOneExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
