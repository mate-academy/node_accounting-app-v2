'use strict';

let expenses = [];

const getExpenses = () => expenses;

const getExpense = (id) => {
  return expenses.find(expense => expense.id === id);
};

const addExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const expense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const updateExpense = (expense, expenseUpdate) => {
  Object.assign(expense, expenseUpdate);

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const deleteAllExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  getExpense,
  addExpense,
  updateExpense,
  deleteExpense,
  deleteAllExpenses,
};
