'use strict';

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const getExpense = (id) => {
  const expense = expenses.find(currentExpense => currentExpense.id === id);

  return expense || null;
};

const createExpense = (body) => {
  const newExpense = {
    id: Math.floor(Math.random() * 1000 - 1) + 1,
  };

  Object.assign(newExpense, body);

  expenses.push(newExpense);

  return newExpense;
};

const updateExpense = (id, args) => {
  const expense = getExpense(id);

  Object.assign(expense, args);

  return expense;
};

const removeExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const reset = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  removeExpense,
  reset,
};
