'use strict';

const { v4: uuidv4 } = require('uuid');

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const findById = (expenseId) => {
  return expenses.find(expense => expense.id === expenseId) || null;
};

const removeExpenses = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const updateExpenses = (expenseId, expenseField) => {
  const expenseIndex = expenses.findIndex(expense => expense.id === expenseId);

  expenses[expenseIndex] = {
    ...expenses[expenseIndex],
    ...expenseField,
  };

  return expenses[expenseIndex];
};

const addExpense = (data) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = data;

  const id = parseInt(uuidv4(), 16);

  const newExpense = {
    id,
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

const filterExpenses = (data) => {
  let filteredExpenses = [...expenses];
  const { userId, categories, from, to } = data;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === Number(userId)
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.spentAt >= from && expense.spentAt <= to
    );
  }

  return filteredExpenses;
};

module.exports = {
  resetExpenses,
  findById,
  removeExpenses,
  updateExpenses,
  addExpense,
  filterExpenses,
};
