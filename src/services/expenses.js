'use strict';

let expenses = [];

const getNextId = (array) => {
  if (array.length === 0) {
    return 1;
  }

  const maxId = Math.max(...array.map(({ id }) => id));

  return maxId + 1;
};

const filterExpenses = (filters) => {
  let filteredExpenses = expenses;
  const { userId, categories, from, to } = filters;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId === Number(userId)
    ));
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate < toDate && fromDate <= expenseDate;
    });
  }

  return filteredExpenses;
};

const getById = (expenseId) => {
  return expenses.find(expense => (
    expense.id === Number(expenseId)
  ));
};

const createExpense = (body) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = body;

  const id = getNextId(expenses);
  const expense = {
    id,
    userId: Number(userId),
    spentAt,
    title,
    amount: Number(amount),
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(({ id }) => (
    id !== Number(expenseId)
  ));
};

const removeAllExpenses = () => {
  expenses = [];
};

module.exports = {
  filterExpenses,
  getById,
  createExpense,
  removeExpense,
  removeAllExpenses,
};
