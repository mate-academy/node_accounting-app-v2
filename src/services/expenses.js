'use strict';

const { getMaxId } = require('../utils/getMaxId');

let initialExpenses = [];

function getAll({ userId, categories, from, to }) {
  if (categories) {
    initialExpenses = initialExpenses.filter((expense) => {
      return categories.includes(expense.category);
    });
  }

  if (userId) {
    initialExpenses = initialExpenses.filter((expense) => {
      return expense.userId === +userId;
    });
  }

  if (from && to) {
    initialExpenses = initialExpenses.filter((expense) => {
      return expense.spentAt >= from && expense.spentAt <= to;
    });
  }

  return initialExpenses;
};

function getById(id) {
  const searchedExpense = initialExpenses.find(expense => expense.id === +id);

  return searchedExpense || null;
};

function create({ userId, spentAt, title, amount, category, note }) {
  const newExpense = {
    id: getMaxId(initialExpenses) + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  initialExpenses.push(newExpense);

  return newExpense;
};

function update(id, params) {
  const expense = getById(id);

  Object.assign(expense, params);
};

function remove(id) {
  initialExpenses = initialExpenses.filter(expense => expense.id !== +id);
};

function removeAllExpenses() {
  initialExpenses = [];
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
