'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const { userId, category, from, to } = req.query;

  const expenses = expensesService.getExpenses(userId, category, from, to);

  res.send(expenses);
};

const findOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addOne = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;

  res.send(newExpense);
};

const deleteOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(Number(expenseId));

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { expenseId } = req.params;
  const data = req.body;

  if (!expenseId) {
    res.statusCode(400);

    return;
  }

  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpense(expenseId, data);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  findOne,
  addOne,
  deleteOne,
  updateOne,
};
