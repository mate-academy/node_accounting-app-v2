'use strict';

let expenses = [];

const getAllExpenses = (filters = {}) => {
  const { userId, categories, from, to } = filters;

  let result = expenses;

  if (userId) {
    result = result.filter((expense) => expense.userId === Number(userId));
  }

  if (categories) {
    result = result.filter((expense) => expense.category === categories);
  }

  if (from) {
    result = result.filter((expense) => {
      return new Date(expense.spentAt) >= new Date(from);
    });
  }

  if (to) {
    result = result.filter((expense) => {
      return new Date(expense.spentAt) <= new Date(to);
    });
  }

  return result;
};

const createExpenses = (expenseData) => {
  const newExpenses = {
    id: expenses.length + 1,
    ...expenseData,
  };

  expenses.push(newExpenses);

  return newExpenses;
};

const getById = (id) => {
  const foundExpenses = expenses.find((expense) => expense.id === id) || null;

  return foundExpenses;
};

const deleteById = (id) => {
  const deletedExpense = expenses.find((expense) => expense.id === id) || null;

  expenses = expenses.filter((expense) => expense.id !== id);

  return deletedExpense;
};

const updateExpenses = (id, expenseData) => {
  const expense = getById(id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, expenseData);

  return expense;
};

const clearDataBase = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  createExpenses,
  getById,
  deleteById,
  updateExpenses,
  clearDataBase,
};
