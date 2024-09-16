'use strict';

let expenses = [];

const getAllExpenses = (url) => {
  const partsUrl = url.split('?');
  const urlParams = new URLSearchParams(partsUrl[1]);
  let filteredExpenses = expenses;

  const userId = urlParams.get('userId');
  const category = urlParams.get('category');
  const from = urlParams.get('from');
  const to = urlParams.get('to');

  if (userId) {
    filteredExpenses = expenses.filter(el => el.userId === +userId);
  }

  if (category) {
    filteredExpenses = expenses.filter(el => el.category === category);
  }

  if (from && to) {
    filteredExpenses = expenses.filter(el => (
      el.spentAt > from && el.spentAt < to
    ));
  }

  return filteredExpenses;
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
