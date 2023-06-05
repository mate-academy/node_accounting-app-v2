/* eslint-disable no-console */
'use strict';

let expenses = [];

const reset = () => {
  expenses = [];
};

const filterExpenses = ({ userId, categories, from, to }) => {
  if (userId) {
    expenses = expenses
      .filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses
      .filter((expense) => categories.includes(expense.category));
  }

  if (from && to) {
    expenses = expenses.filter(({ spentAt }) => (
      spentAt >= from && spentAt <= to
    ));
  }

  return expenses;
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses.find((expense) => expense.id === +expenseId);

  return foundExpense || null;
};

const createExpense = (data) => {
  const newExpense = {
    id: Math.random(expenses.length + 1),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter((expense) => expense.id !== +expenseId);

  return expenses;
};

const updateExpense = ({ id, ...data }) => {
  const foundExpense = getExpenseById(id);

  Object.assign(foundExpense, data);

  return foundExpense;
};

module.exports = {
  filterExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
  reset,
};
