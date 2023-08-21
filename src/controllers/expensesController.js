'use strict';

const { BadRequest, NotFound } = require('http-errors');
const expensesService = require('../services/expenses');
const usersService = require('../services/users');

function getExpenses(req, res) {
  const expenses = expensesService.getAll();

  res.send(expenses);
}

function getExpense(req, res) {
  const { expenseId } = req.params;

  if (isNaN(expenseId)) {
    throw new BadRequest('Invalid expense id');
  }

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    throw new NotFound('Expense is not found');
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
  const foundUser = usersService.getById(userId);

  if (!foundUser) {
    throw new BadRequest('User is not found');
  }

  const newExpense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || null,
  });

  res.status(201).send(newExpense);
}

function updateExpense(req, res) {
  const { expenseId } = req.params;

  if (isNaN(expenseId)) {
    throw new BadRequest('Invalid expense id');
  }

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    throw new NotFound('Expense is not found');
  }

  const { body } = req;

  const updatedExpense = expensesService.update({
    id: expenseId,
    body,
  });

  res.send(updatedExpense);
}

function deleteExpense(req, res) {
  const { expenseId } = req.params;

  if (isNaN(expenseId)) {
    throw new BadRequest('Invalid expense id');
  }

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    throw new NotFound('Expense is not found');
  }

  expensesService.remove(expenseId);
  res.status(204).send();
}

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
