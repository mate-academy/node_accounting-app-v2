'use strict';

const { usersService } = require('../users/users.service');
const { expensesService } = require('./expenses.service');

const getAllExpenses = (req, res) => {
  const { categories, userId, from, to } = req.query;
  let filteredExpenses = expensesService.getExpenses();

  switch (req.query) {
    case categories:
      filteredExpenses = filteredExpenses
        .filter(expense => expense.category === categories);
      break;
    case userId:
      filteredExpenses = filteredExpenses
        .filter(expense => expense.userId === Number(userId));
      break;

    case from:
      filteredExpenses = filteredExpenses
        .filter(expense => new Date(expense.spentAt) > new Date(from));
      break;

    case to:
      filteredExpenses = filteredExpenses
        .filter(expense => new Date(expense.spentAt) < new Date(to));
      break;

    default:
      break;
  }

  res.send(filteredExpenses);
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addNextExpense = (req, res) => {
  const { userId, spendAt, title, amount, category, note } = req.body;

  const index = usersService.indexOfUser(Number(userId));

  if (index === -1) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !spendAt || !title || !amount || !category || !note) {
    res.sendStatus(404);

    return;
  }

  const nextExpense = {
    id: Date.now(),
    userId: Number(userId),
    spendAt,
    title,
    amount: Number(amount),
    category,
    note,
  };

  expensesService.addExpense(nextExpense);
  res.statusCode = 201;
  res.send(nextExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.body;
  const index = expensesService.indexOfExpense(expenseId);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(index);
  res.statusCode = 204;
};

const expenseToUpdate = (req, res) => {
  const { expenseId } = req.params;
  const { spendAt, title, amount, category, note } = req.body;
  const index = expensesService.indexOfExpense(expenseId);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(200);

  res.send(expensesService
    .updateExpense(index, spendAt, title, amount, category, note));
};

const expensesController = {
  getAllExpenses,
  getOneExpense,
  addNextExpense,
  deleteExpense,
  expenseToUpdate,
};

module.exports = { expensesController };
