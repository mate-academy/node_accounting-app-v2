'use strict';

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const resetExpenses = () => {
  expenses = [];
};

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = {
    id: expenses.length,
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

const updateExpense = (title, expense) => {
  return Object.assign(expense, { title });
};

const deleteExpense = (id) => {
  return expenses.filter(expense => expense.id !== +id);
};

const setExpenses = (newExpenses) => {
  expenses = newExpenses;
};

module.exports = {
  getAllExpenses,
  resetExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  setExpenses,
};
