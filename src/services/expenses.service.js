'use strict';

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const addExpenses = (expense) => {
  return expenses.push(expense);
};

const getExpensesById = (id) => {
  return expenses.find(expense => expense.id === +id);
};

const removeExpenses = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const updateExpenses = (id, body) => {
  const expense = getExpensesById(id);

  if (!expense) {
    return;
  }

  Object.assign(expense, body);

  return expense;
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  addExpenses,
  getExpensesById,
  removeExpenses,
  updateExpenses,
  clear,
};
