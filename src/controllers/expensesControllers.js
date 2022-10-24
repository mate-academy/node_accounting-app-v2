'use strict';

const expenseService = require('../services/expensesServices.js');
const userService = require('../services/userServices.js');

const getAllExpenses = (req, res) => {
  const { category, userId, from, to } = req.query;

  const expenses = expenseService.getExpenses();
  const foundUser = userService.getUserById(userId);
  const categoryExpense = expenseService.getExpenseByCategory(category);
  const userExpense = expenseService.getExpenseByUser(userId);
  const expenseBetweenDate = expenseService.getExpensesBetweenDates(from, to);

  if (from && to) {
    res.send(expenseBetweenDate);

    return;
  }

  if (category) {
    res.send(categoryExpense);

    return;
  }

  if (foundUser) {
    res.send(userExpense);

    return;
  }

  res.send(expenses);
};

const getExpenserById = (req, res) => {
  const { id } = req.params;
  const foundExpense = expenseService.getExpensesById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = userService.getUserById(userId);

  if (!userId || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newUser = expenseService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newUser);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const foundExpense = expenseService.getExpensesById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const foundExpense = expenseService.getExpensesById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.updateExpense(foundExpense, req.body);
  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getExpenserById,
  createExpense,
  deleteExpense,
  updateExpense,
};
