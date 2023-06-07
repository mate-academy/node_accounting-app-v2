'use strict';

const userServices = require('../services/users');
const expenseServices = require('../services/expenses');

const getAllExpenses = (req, res) => {
  const filteredExpenses = expenseServices.filterExpenses(req.query);

  res.send(filteredExpenses);
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
  } = req.body;

  const users = userServices.getAllUsers();
  const usersIds = users.map(user => user.id);
  const isValidUser = usersIds.includes(userId);

  if (!isValidUser || !spentAt || !title) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseServices.createExpense(req.body);

  res.status(201);
  res.send(expense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.removeExpense(expenseId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const reqBody = req.body;
  const foundExpense = expenseServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.updateExpense(expenseId, reqBody);

  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getExpense,
  addExpense,
  removeExpense,
  updateExpense,
};
