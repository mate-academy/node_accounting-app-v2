'use strict';

const userService = require('../services/users');
const expensesService = require('../services/expenses');

const getAllExpenses = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;
  const regex = /^\d+$/;

  if (!regex.test(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.findById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const createExpense = (req, res) => {
  const data = req.body;
  const userExpense = userService.findById(data.userId);

  if (!Object.entries(data).length || !userExpense) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(data);

  res.status(201).send(newExpense);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const body = req.body;
  const regex = /^\d+$/;

  if (!regex.test(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.update(expenseId, body);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const regex = /^\d+$/;

  if (!regex.test(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
