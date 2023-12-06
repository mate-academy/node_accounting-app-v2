'use strict';

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getAllExpenses = () => {
  return expenses;
};

const getExpenseById = (id) => {
  return expenses.find(e => e.id === +id) || null;
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

const deleteExpense = (id) => {
  return expenses.filter(user => user.id !== +id);
};

const setAllExpenses = (newExpenses) => {
  expenses = newExpenses;
};

const changeExpense = (title, expense) => {
  return Object.assign(expense, { title });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  setAllExpenses,
  changeExpense,
  clearExpenses,
};
