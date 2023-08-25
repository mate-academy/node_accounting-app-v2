'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

function getAllExpenses(req, res) {
  const query = req.query;
  const expenses = expenseService.getAll(query);

  res.send(expenses);
}

function getExpenseById(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Element not found');

    return;
  }

  res.send(foundExpense);
}

function createExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.statusCode = 400;
    res.send('Some fields were missed');

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 400;
    res.send('User not found');

    return;
  }

  const newExpense = expenseService.create({
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

function update(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Expense not found');

    return;
  }

  const { body } = req;

  const updatedExpense = expenseService.update(expenseId, body);

  res.statusCode = 200;
  res.send(updatedExpense);
}

function remove(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Expense not found');

    return;
  }

  expenseService.remove(expenseId);

  res.statusCode = 204;
  res.send();
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  update,
  remove,
};
