'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

function getExpenses(req, res) {
  const filtredExpenses = expensesService.getExpenses(req.query);

  res.status(200).send(filtredExpenses);
}

function getExpenseById(req, res) {
  const { id } = req.params;
  const foundExpense = expensesService.getExpenseById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundExpense);
}

function createExpense(req, res) {
  const { userId, spentAt, title, amount, category } = req.body;
  const foundUser = usersService.getUserById(userId);

  if (!foundUser || !title || !spentAt || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.createExpense(req.body);

  res.status(201).send(expense);
}

function deleteExpense(req, res) {
  const { id } = req.params;
  const foundExpence = expensesService.getExpenseById(id);

  if (!foundExpence) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(id);

  res.sendStatus(204);
}

function updateExpense(req, res) {
  const { id } = req.params;
  const foundExpense = expensesService.getExpenseById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (req.body.hasOwnProperty('id') || req.body.hasOwnProperty('userId')) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesService.updateExpense(id, req.body);

  res.status(200).send(updatedExpense);
}

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
