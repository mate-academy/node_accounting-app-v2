'use strict';

const { getNewId } = require('../helpers/helpers.js');

let expenses = [];

function clearExpenses() {
  expenses = [];
}

function getAll(params) {
  const {
    userId,
    categories,
    from,
    to,
  } = params;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = expenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    filteredExpenses = expenses
      .filter(({ category }) => categories.includes(category));
  }

  if (from) {
    filteredExpenses = expenses
      .filter(({ spentAt }) => spentAt > from);
  }

  if (to) {
    filteredExpenses = expenses
      .filter(({ spentAt }) => spentAt < to);
  }

  return filteredExpenses;
}

function getById(id) {
  const expenseId = expenses.find(expense => expense.id === id);

  return expenseId || null;
}

function getByUserId(userId) {
  const filtered = expenses.filter(expense => expense.userId === userId);

  return filtered;
}

function create(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: getNewId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(id) {
  expenses = expenses.filter(expense => expense.id !== id);
}

function update({ id, ...data }) {
  const expense = getById(id);

  Object.assign(expense, data);
}

module.exports = {
  getAll,
  getById,
  getByUserId,
  remove,
  update,
  create,
  clearExpenses,
};
