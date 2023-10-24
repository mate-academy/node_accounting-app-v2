'use strict';

const expensesServices = require('../services/expenses.services.js');
const userServices = require('../services/users.services.js');

const getAllExpenses = (req, res) => {
  res.status(200).send(expensesServices.getAllExpenses(req.query));
};

const addExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note
    || !userServices.getUserById(userId)) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(expensesServices.createExpense(req.body));
};

const getCurrentExpense = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const currentExpense = expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(currentExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const currentExpense = expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.removeExpense(expenseId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const currentExpense = expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesServices.updateExpense(expenseId, req.body);

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  addExpense,
  getCurrentExpense,
  removeExpense,
  updateExpense,
};
