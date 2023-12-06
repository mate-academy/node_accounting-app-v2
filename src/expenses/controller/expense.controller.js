'use strict';

const userService = require('../../users/services/user.service').services;
const expensesService = require('../services/expense.service').services;

function get(req, res) {
  const { userId, from, to, categories } = req.query;

  res.send(expensesService.getExpenses(userId, from, to, categories));
};

function post(req, res) {
  const {
    userId,
    title,
  } = req.body;

  if (!userService.getOneUser(userId) || !title) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(expensesService.createExpense(req.body));
}

function getById(req, res) {
  const { id } = req.params;

  const expense = expensesService.getOneExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
}

function deleteById(req, res) {
  const { id } = req.params;

  if (!expensesService.getOneExpense(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(id);

  res.sendStatus(204);
}

function patch(req, res) {
  const { id } = req.params;

  const expenseToUpdate = expensesService.getOneExpense(id);

  if (!expenseToUpdate) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesService.updateExpense(expenseToUpdate, req.body));
}

const controller = {
  get,
  post,
  getById,
  deleteById,
  patch,
};

module.exports = {
  controller,
};
