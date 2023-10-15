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
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

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
    res.sendStatus(400);

    return;
  }

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

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
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updateData = { ...req.body };

  if ('id' in updateData) {
    delete updateData['id'];
  };

  if ('userId' in updateData) {
    delete updateData['userId'];
  }

  if ('spentAt' in updateData) {
    updateData['spentAt'] = new Date(updateData['spentAt']);
  }

  if (Object.keys(updateData).length === 0) {
    res.sendStatus(400);

    return;
  }

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
