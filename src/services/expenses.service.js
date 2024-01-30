'use strict';

let expenses = [];

const getAllExpenses = (userId, categories, from, to) => {
  let filteredExpenses = {};

  if (categories && userId) {
    filteredExpenses = expenses.filter(item => item.category === categories);

    return filteredExpenses;
  };

  if (userId) {
    filteredExpenses = expenses.filter(
      item => item.userId === Number(userId));

    return filteredExpenses;
  }

  if (from && to) {
    filteredExpenses = expenses.filter(
      item => item.spentAt > from && item.spentAt < to);

    return filteredExpenses;
  }

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
    id: Math.floor(Math.random() * Date.now()),
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
