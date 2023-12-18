'use strict';

let expenses = [];
const getExpenses = ({ userId, categories, from, to }) => {
  if (userId) {
    return expenses.find(expanse => expanse.userId === userId);
  }

  if (categories) {
    return expenses.find(expanse => expanse.categories.includes(categories));
  }

  if (from) {
    return expenses.find(expanse => expanse.spentAt >= from);
  }

  if (from) {
    return expenses.find(expanse => expanse.spentAt <= to);
  }
};

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === id);
};
const addExpense = (expense) => {
  return expenses.push(expense);
};

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const updateExpense = (id, title, amount, category, note) => {
  const expense = getExpenseById(id);

  Object.assign(expense, {
    title, amount, category, note,
  });

  return expense;
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
};
