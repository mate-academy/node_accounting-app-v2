'use strict';

const { getNewId } = require('../utils/getNewId.js');

let expenses = [];

function resetExpenses() {
  expenses = [];
};

const getAll = () => expenses;

const getById = (id) => (
  expenses.find(expense => expense.id === id)
);

const create = (options) => {
  const {
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  } = options;

  const newExpenseId = getNewId(expenses);

  const newExpense = {
    id: newExpenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses = [...expenses, newExpense];

  return newExpense;
};

const remove = (id) => {
  const newExpenses = expenses.filter(expense => expense.id !== id);

  expenses = newExpenses;
};

const patch = (options) => {
  const {
    id,
    ...updates
  } = options;

  const expenseToUpdate = expenses.find(expense => expense.id === id);

  const entriesToUpdate = Object.entries(updates)
    .filter(([_, value]) => value);

  const updatesFiltered = Object.fromEntries(entriesToUpdate);

  Object.assign(expenseToUpdate, updatesFiltered);

  return expenseToUpdate;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  patch,
  resetExpenses,
};
