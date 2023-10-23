'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getExpenses = (req, res) => {
  const expenses = expensesService.getExpenses(req.query);

  res.send(expenses);
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = expensesService.getExpenseById(Number(expenseId));

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedExpense);
};

const createExpense = (req, res) => {
  const {
    userId,
    title,
    spentAt,
    category,
    note,
    amount,
  } = req.body;

  const user = usersService.getUserById(Number(userId));

  if (!title || !user || !spentAt || !category || !note || !amount) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense(req.body);

  res.status(201).send(newExpense);
};

const updateExpense = (req, res) => {
  const expense = req.body;
  const { expenseId } = req.params;
  const foundedExpense = expensesService.getExpenseById(Number(expenseId));

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService
    .updateExpense(Number(expenseId), expense);

  res.send(updatedExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = expensesService.getExpenseById(Number(expenseId));

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(Number(expenseId));
  res.sendStatus(204);
};

module.exports = {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
