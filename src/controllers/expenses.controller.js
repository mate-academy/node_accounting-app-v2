'use strict';

const { expensesService }
= require('../services/expenses.service');
const { usersService } = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const { categories, userId, from, to } = req.query;
  let filteredResponse = [...expensesService.getExpenses()];

  if (categories) {
    filteredResponse = filteredResponse
      .filter(expense => expense.category === categories);
  }

  if (userId) {
    filteredResponse = filteredResponse
      .filter(expense => expense.userId === +userId);
  }

  if (from) {
    filteredResponse = filteredResponse
      .filter(expense => new Date(expense.spentAt) > new Date(from));
  }

  if (to) {
    filteredResponse = filteredResponse
      .filter(expense => new Date(expense.spentAt) < new Date(to));
  }

  res.send(filteredResponse);
};

const createNewExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const indexOfUser = usersService.userIndex(+userId);

  const uniqueId = Date.now() + Math.floor(Math.random() * 1000);

  if (indexOfUser === -1) {
    res.sendStatus(400);

    return;
  }

  if (!(userId && spentAt && title && amount && category && note)) {
    res.sendStatus(404);

    return;
  }

  const expense = {
    id: uniqueId,
    userId: +userId,
    spentAt: spentAt,
    amount: +amount,
    title,
    category,
    note,
  };

  expensesService.addNewExpense(expense);
  res.statusCode = 201;

  res.send(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const indexOfExpenses = expensesService.expenseIndex(id);

  if (indexOfExpenses === -1) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesService
    .updateExpenseValues(
      indexOfExpenses, spentAt, title, amount, category, note
    ));
};

const getExpenseById = (req, res) => {
  const { id } = req.params;
  const sendExpense = expensesService.getUserById(id);

  if (!sendExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(sendExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const indexOfDelete = expensesService.expenseIndex(id);

  if (indexOfDelete === -1) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteOneExpense(indexOfDelete);

  res.sendStatus(204);
};

const expensesController = {
  getAllExpenses,
  createNewExpense,
  updateExpense,
  getExpenseById,
  deleteExpense,
};

module.exports = {
  expensesController,
};
