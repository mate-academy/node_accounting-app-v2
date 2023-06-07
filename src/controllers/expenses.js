'use strict';

const userService = require('../services/users');
const expensesService = require('../services/expenses');

const getAllExpenses = (req, res) => {
  const data = req.query;
  const expenses = expensesService.getAllExpenses(data);

  res.send(expenses);
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const dataExpense = req.body;
  const userExpense = userService.findUserById(+dataExpense.userId);

  if (!Object.entries(dataExpense).length || !userExpense) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense(dataExpense);

  res.status(201);
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(Number(expenseId));
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const expenseBody = req.body;
  const updatedExpense = expensesService.updateExpense(expenseId, expenseBody);

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
