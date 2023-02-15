'use strict';

const expensesServices = require('../services/expenses');
const usersServices = require('../services/users');

function getAll(req, res) {
  const { userId, category, from, to } = req.query;

  const searchParams = {
    userId,
    category,
    from,
    to,
  };

  const expenses = expensesServices.getAll(searchParams);

  res.statusCode = 200;
  res.send(expenses);
}

function addExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = usersServices.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expenseData = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const newExpense = expensesServices.addExpense(expenseData);

  res.statusCode = 201;
  res.send(newExpense);
}

function getById(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
}

function removeExpense(req, res) {
  const { expenseId } = req.params;

  const expenseToRemove = expensesServices.getById(expenseId);

  if (!expenseToRemove) {
    res.sendStatus(404);

    return;
  }

  expensesServices.removeExpense(expenseId);
  res.sendStatus(204);
}

function updateExpense(req, res) {
  const { expenseId } = req.params;
  const { title } = req.body;

  const expense = expensesServices.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const dataToUpdate = { title };

  const updatedExpense = expensesServices.updateExpense(
    expenseId,
    dataToUpdate
  );

  res.statusCode = 200;
  res.send(updatedExpense);
}

module.exports = {
  getAll,
  addExpense,
  getById,
  removeExpense,
  updateExpense,
};
