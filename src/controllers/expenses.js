'use strict';

const expenseService = require('../services/expensesService');
const usersService = require('../services/usersService');

function getAllExpenses(req, res) {
  const query = req.query;
  const expenses = expenseService.getAllExpenses(query);

  res.send(expenses);
}

function getOneExpense(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getByExpenseId(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Expense is not found');

    return;
  }

  res.send(foundExpense);
};

function addExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.statusCode = 400;
    res.send('All fields are require');

    return;
  }

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.statusCode = 400;
    res.send('User is not found');

    return;
  }

  const newExpense = expenseService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
}

function updateExpense(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getByExpenseId(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Expense is not found');

    return;
  }

  const { body } = req;

  const updatedExpense = expenseService.updateExpense(expenseId, body);

  res.statusCode = 200;
  res.send(updatedExpense);
};

function removeExpense(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getByExpenseId(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Expense is not found');

    return;
  }

  expenseService.removeExpense(expenseId);

  res.statusCode = 204;
  res.send();
}

module.exports = {
  getAllExpenses,
  getOneExpense,
  addExpense,
  updateExpense,
  removeExpense,
};
