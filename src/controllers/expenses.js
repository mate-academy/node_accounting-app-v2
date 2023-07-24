'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getExpenseById = async(request, response) => {
  const { expenseId } = request.params;

  if (!expenseId) {
    response
      .sendStatus(400);

    return;
  }

  const expense = await expensesService.getExpenseById(expenseId);

  if (!expense) {
    response
      .sendStatus(404);

    return;
  }

  response
    .status(200)
    .send(expense);
};

const getAllExpenses = async(request, response) => {
  const expenses = expensesService.getAllExpenses(request.query);

  response
    .status(200)
    .send(expenses);
};

const addExpense = async(request, response) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = request.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    response
      .sendStatus(400);

    return;
  }

  const user = await usersService.getUserById(userId);

  if (!user) {
    response
      .sendStatus(400);

    return;
  }

  const expense = await expensesService.addExpense(request.body);

  response
    .status(201)
    .send(expense);
};

const updateExpense = async(request, response) => {
  const { expenseId } = request.params;

  if (!expenseId) {
    response
      .sendStatus(400);

    return;
  }

  const expense = await expensesService.getExpenseById(expenseId);

  if (!expense) {
    response
      .sendStatus(404);

    return;
  }

  const {
    title,
    amount,
    category,
    note,
  } = request.body;

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

  response
    .status(200)
    .send(expense);
};

const deleteExpense = async(request, response) => {
  const { expenseId } = request.params;

  if (!expenseId) {
    response
      .sendStatus(400);

    return;
  }

  const isDeletedExpense = expensesService.deleteExpense(expenseId);

  if (!isDeletedExpense) {
    response
      .sendStatus(404);

    return;
  }

  response
    .sendStatus(204);
};

module.exports = {
  getExpenseById,
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
