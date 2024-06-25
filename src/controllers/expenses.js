'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAllExpenses = (req, res) => {
  const expenses = expensesService.getAllExpenses();

  res.send(expenses);
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

  const user = usersService.getUserById(+userId);

  if (!title || !user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.addExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.status(201);
  res.send(newExpense);
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(foundExpense);
};

const editExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  Object.assign(foundExpense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(foundExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(+expenseId);

  res.status(204);
};

module.exports = {
  getAllExpenses,
  addExpense,
  getExpense,
  editExpense,
  deleteExpense,
};
