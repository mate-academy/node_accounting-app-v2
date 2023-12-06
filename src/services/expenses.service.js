'use strict';

let expenses = [];

const getAllExpenses = () => expenses;

const getExpenseById = id => expenses.find(e => e.id === +id) || null;

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

const deleteExpense = id => expenses.filter(user => user.id !== +id);

const updateExpense = (title, expense) => Object.assign(expense, { title });

const setAllExpenses = newExpenses => {
  expenses = newExpenses;
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  setAllExpenses,
  clearExpenses,
};
