'use strict';

let expenses = [];

const getExpenses = () => {
  return expenses;
};

const getExpense = (id) => {
  return expenses.find(expense => expense.id === Number(id)) || null;
};

const addExpense = (values) => {
  const newExpense = {
    id: Number(new Date()),
    ...values,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== Number(id));
};

const updateExpenseById = (id, body) => {
  const expense = getExpense(id);

  Object.assign(expense, body);
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  clearExpenses,
  addExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpenseById,
};
