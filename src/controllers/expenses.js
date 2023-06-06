'use strict';

const expensesService = require('../services/expenses');
const userService = require('../services/users');

const getAllFiltered = (req, res) => {
  const filtered = expensesService.filterExpenses(req.query);

  res.send(filtered);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const expense = expensesService.findById(Number(expenseId));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpenses(Number(expenseId));
  res.sendStatus(204);
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

  const user = userService.getById(Number(userId));

  if (!user || !userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpenses = expensesService.addExpense(req.body);

  res.statusCode = 201;
  res.send(newExpenses);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const expense = expensesService.findById(Number(expenseId));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpenses(+expenseId, req.body);

  res.send(updatedExpense);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const expense = expensesService.findById(Number(expenseId));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

module.exports = {
  getAllFiltered,
  removeExpense,
  addExpense,
  updateExpense,
  getOne,
};
