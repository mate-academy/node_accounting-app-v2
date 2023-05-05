'use strict';

const { expensesService } = require('../services/expenses');
const { usersService } = require('../services/users');

const getAll = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.send(expenses);
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const postExpense = (req, res) => {
  const {
    userId,
    title,
    spentAt,
  } = req.body;

  const user = usersService.getUserById(+userId);

  if (!title || !user || !spentAt) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.addExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const expense = req.body;
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpense(+expenseId, expense);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getExpense,
  postExpense,
  deleteExpense,
  updateExpense,
};
