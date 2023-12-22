'use strict';

let expenses = [];

const getAllExpenses = () => {
  return expenses;
};

const getExpensesById = (id) => {
  return expenses.find(item => item.id === Number(id));
};

const createExpenses = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const item = {
    id: Math.floor(Math.random() * 10000),
    userId: Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(item);

  return item;
};

const removeExpenses = (id) => {
  expenses = expenses.filter(item => item.id !== Number(id));
};

const updateExpenses = (title, expense) => {
  return Object.assign(expense, { title });
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getExpensesById,
  createExpenses,
  removeExpenses,
  updateExpenses,
  clearExpenses,
};
