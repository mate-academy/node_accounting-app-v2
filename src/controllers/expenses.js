'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const expenses = expensesService.getAll();
  const params = req.query;

  if (!Object.keys(params).length) {
    res.send(expenses);

    return;
  }

  const filteredExpenses = expensesService.getFilteredExpenses(params);

  res.send(filteredExpenses);
};

const getOneById = (req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = expensesService.getExpenseById(+expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedExpense);
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

  const foundedUser = usersService.getUserById(userId);

  if (!foundedUser || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.addExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.send(newExpense);
};

const deleteOne = (req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = expensesService.getExpenseById(+expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(+expenseId);
  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = expensesService.getExpenseById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  expensesService.updateExpense(expenseId, req.body);
};

module.exports = {
  getAll,
  getOneById,
  addOne,
  deleteOne,
  updateOne,
};
