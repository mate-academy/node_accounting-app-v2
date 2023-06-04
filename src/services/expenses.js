'use strict';

const { v4: uuidv4 } = require('uuid');

let expenses = [];

const getFilteredExpenses = (data) => {
  let filteredExpenses = expenses;

  const {
    userId,
    categories,
    from,
    to,
  } = data;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from && expense.spentAt <= to);
  }

  return filteredExpenses;
};

const getById = (expenseId) => expenses
  .find(expense => expense.id === expenseId) || null;

const create = (data) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = data;

  const newExpense = {
    id: parseInt(uuidv4(), 16),
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

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const update = ({ id, ...data }) => {
  const expense = getById(id);

  Object.assign(expense, data);

  return expense;
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getFilteredExpenses,
  getById,
  create,
  update,
  remove,
  reset,
};
