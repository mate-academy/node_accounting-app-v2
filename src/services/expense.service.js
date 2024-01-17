'use strict';

const { getNewId } = require('../utils/getNewId.js');

let expenses = [];

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
    spentAt,
    title,
    amount,
    category,
    note,
  } = options;

  const expenseToUpdate = expenses.find(expense => expense.id === id);

  Object.assign(expenseToUpdate, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expenseToUpdate;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  patch,
};
