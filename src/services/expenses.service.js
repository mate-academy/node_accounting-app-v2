'use strict';

let expenses = [];

const getExpenses = (filterProperties) => {
  const { userId, categories, from, to } = filterProperties;

  return expenses.filter(expense => {
    const userIdMatch = !userId || expense.userId === userId;
    const categoriesMatch = !categories
      || expense.categories.includes(categories);
    const fromMatch = !from || expense.spentAt >= from;
    const toMatch = !to || expense.spentAt <= to;

    return userIdMatch && categoriesMatch && fromMatch && toMatch;
  });
};

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === Number(id)) || null;
};

const addExpense = (expense) => {
  const getMaxId = expenses[expenses.length - 1].id || 0;

  const newExpense = {
    id: getMaxId + 1,
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (id) => {
  const normalizedId = parseInt(id);

  const initialLength = expenses.length;

  expenses = expenses.filter(expense => expense.id !== normalizedId);

  return expenses.length < initialLength;
};

const updateExpense = (id, newProperties) => {
  const expense = getExpenseById(id);

  Object.assign(expense, newProperties);

  return expense;
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
  updateExpense,
};
