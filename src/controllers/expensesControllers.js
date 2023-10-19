'use strict';

const expensesService = require('../services/expensesService');
const usersService = require('../services/usersService');

const getAllExpenses = (req, res) => {
  const { userId, from, to, categories } = req.query;

  let expenses = expensesService.getAllExpenses();

  if (userId) {
    expenses = expenses.filter((e) => e.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (from) {
    expenses = expenses.filter((e) => e.spentAt >= from);
  }

  if (to) {
    expenses = expenses.filter((e) => e.spentAt <= to);
  }

  res.send(expenses);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const idForUser = +userId;

  const userById = usersService.getUserById(idForUser);

  if (!userById) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expensesService.addExpense(newExpense);

  res.statusCode = 201;
  res.send(newExpense);
};

const getExpenseById = (req, res) => {
  const id = +req.params.id;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const removeExpenseById = (req, res) => {
  const id = +req.params.id;

  const expenseById = expensesService.getExpenseById(id);

  if (!expenseById) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpenseById(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const id = +req.params.id;
  const expenseToUpdate = req.body;

  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  Object.assign(expense, expenseToUpdate);

  res.send(expense);
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  removeExpenseById,
  updateExpense,
};
