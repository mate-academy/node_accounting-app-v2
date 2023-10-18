'use strict';

let expenses = [];

const getAllExpenses = () => expenses;

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const addExpense = (userId, spentAt, title, amount, category, note) => {
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

const updateExpense = (id, expenseToUpdate) => {
  const expense = getExpenseById(id);

  if (!expense) {
    return;
  }

  Object.assign(expense, expenseToUpdate);

  return expense;
};

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
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
