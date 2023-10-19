'use strict';

let expenses = [];

const getAllExpenses = () => expenses;

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === Number(id)) || null;
};

const addExpense = (exprense) => {
  const expense = {
    id: Number(new Date()),
    ...exprense,
  };

  expenses.push(expense);

  return expense;
};

const updateExpense = (id, expenseToUpdate) => {
  const expense = getExpenseById(id);

  if (!expense) {
    return;
  }

  Object.assign(expense, expenseToUpdate);

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== Number(id));
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
  clearExpenses,
};
