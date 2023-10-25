/* eslint-disable max-len */
'use strict';

const { expensesService } = require('./expensesService');
const { usersService } = require('../users/userService');

function getAllExpenses(req, res) {
  const { categories, userId, from, to } = req.query;
  let filteredExpenses = expensesService.getExpenses();

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === categories);
  } else if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  } else if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(expense => {
        return new Date(expense.spentAt) >= new Date(from)
        && new Date(expense.spentAt) <= new Date(to);
      });
  }

  res.send(filteredExpenses);
};

function createNewExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const index = usersService.userIndex(+userId);

  if (index === -1) {
    res.sendStatus(400);

    return;
  }

  if (!(userId && spentAt && title && amount && category && note)) {
    res.sendStatus(404);

    return;
  }

  const expense = {
    id: expensesService.expenses.length + 1,
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

function updateExpense(req, res) {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const index = expensesService.getExpenseById(id);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesService
    .updateExpenseProps(index, spentAt, title, amount, category, note));
};

function getExpenseById(req, res) {
  const { id } = req.params;
  const expense = expensesService.getUserById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

function deleteExpense(req, res) {
  const { id } = req.params;
  const index = expensesService.getExpenseById(id);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpenseByIndex(index);

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
