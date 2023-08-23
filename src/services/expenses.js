'use strict';

const getUid = require('get-uid');

let expenses = [];

function getAll({ userId, categories, from, to }) {
  if (categories) {
    expenses = expenses.filter((expense) => {
      return categories.includes(expense.category);
    });
  }

  if (userId) {
    expenses = expenses.filter((expense) => {
      return expense.userId === +userId;
    });
  }

  if (from && to) {
    expenses = expenses.filter((expense) => {
      return expense.spentAt >= from && expense.spentAt <= to;
    });
  }

  return expenses;
};

function getById(id) {
  const searchedExpense = expenses.find(expense => expense.id === +id);

  return searchedExpense || null;
};

function create({ userId, spentAt, title, amount, category, note }) {
  const newExpense = {
    id: getUid(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

function update(id, params) {
  const expense = getById(id);

  Object.assign(expense, params);
};

function remove(id) {
  expenses = expenses.filter(expense => expense.id !== +id);
};

function removeAllExpenses() {
  expenses = [];
};

const expenseServices = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeAllExpenses,
};

module.exports = expenseServices;
