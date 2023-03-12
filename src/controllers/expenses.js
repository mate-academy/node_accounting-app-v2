'use strict';

const expensesServices = require('../services/expenses');
const { getUserById } = require('../services/users');

const getAll = (req, res) => {
  const params = req.query;
  const foundExpenses = expensesServices.getAll(params);

  res.send(foundExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  const expenseToDelete = expensesServices.getExpenseById(expenseId);

  if (!expenseToDelete) {
    res.sendStatus(404);

    return;
  }

  expensesServices.deleteExpense(expenseId);
  res.sendStatus(204);
};

const addNewExpense = (req, res) => {
  const expense = req.body;
  const { userId } = req.body;

  const foundUser = getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.addNewExpense(expense);

  res.statusCode = 201;
  res.send(newExpense);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const dataToUpdate = req.body;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const expenseToUpdate = expensesServices.getExpenseById(expenseId);

  if (!expenseToUpdate) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesServices.updateExpense(
    expenseId,
    dataToUpdate
  );

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  deleteExpense,
  addNewExpense,
  updateExpense,
};
