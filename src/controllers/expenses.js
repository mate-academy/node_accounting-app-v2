'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getExpenses = async(req, res) => {
  const expenses = await expensesService.getExpenses(req.query);

  res.status(200).send(expenses);
};

const addExpense = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.getUserById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.addExpense(req.body);

  res.status(201).send(expense);
};

const getExpenseById = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.getExpenseById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const deleteExpense = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const isDeleted = await expensesService.deleteExpense(expenseId);

  if (!isDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.getExpenseById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const { title, amount, category, note } = req.body;

  if (title) {
    expense.title = title;
  }

  if (amount) {
    expense.amount = amount;
  }

  if (category) {
    expense.category = category;
  }

  if (note) {
    expense.note = note;
  }

  res.status(200).send(expense);
};

module.exports = {
  getExpenses,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
