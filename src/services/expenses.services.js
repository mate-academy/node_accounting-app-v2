'use strict';

const { getUserById } = require('./user.services');

let expenses = [];

const getExpenses = (userId, categories = [], from, to) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    const id = +userId;

    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === id,
    );
  }

  if (categories.length > 0) {
    const categoriesList = categories.split(',');

    filteredExpenses = filteredExpenses.filter((expense) => {
      return categoriesList.includes(expense.category);
    });
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return filteredExpenses;
};

const getExpenseById = (id) => {
  const expense = expenses.find((exp) => exp.id === Number(id));

  if (!expense) {
    throw new Error('Expense not found');
  }

  return expense;
};

const addExpense = (userId, expenseData) => {
  const user = getUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const newExpense = {
    id: Date.now(),
    userId,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (id) => {
  const index = expenses.findIndex((expense) => expense.id === Number(id));

  if (index === -1) {
    throw new Error('Expense not found');
  }

  expenses.splice(index, 1);
};

const updateExpense = (id, expenseData) => {
  const index = expenses.findIndex((expense) => expense.id === Number(id));

  if (index === -1) {
    throw new Error('Expense not found');
  }

  expenses[index] = {
    ...expenses[index],
    ...expenseData,
  };

  return expenses[index];
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
  resetExpenses,
};
