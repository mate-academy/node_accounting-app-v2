'use strict';

let expenses = [];

const getExpenses = () => expenses;

const getExpenseById = (id) => {
  const normalizedId = parseInt(id);

  return expenses.find(expense => expense.id === normalizedId) || null;
};

const addExpense = (expense) => {
  const getMaxId = expenses[expenses.length - 1].id || 0;

  const newExpense = {
    id: getMaxId + 1,
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (id) => {
  const normalizedId = parseInt(id);

  expenses = expenses.filter(expense => expense.id !== normalizedId);
};

const updateExpense = (id, newProperties) => {
  const expense = getExpenseById(id);

  Object.assign(expense, newProperties);

  return expense;
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
  updateExpense,
};
