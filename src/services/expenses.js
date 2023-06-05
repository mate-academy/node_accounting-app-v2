'use strict';

let expenses = [];

const getMax = (array) => {
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
      expense.userId.toString() === userId
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
    expense.id.toString() === expenseId
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

  const id = getMax(expenses);
  const expense = {
    id,
    userId: +userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(({ id }) => (
    id.toString() !== expenseId
  ));
};

const removeAll = () => {
  expenses = [];
};

module.exports = {
  filterExpenses,
  getById,
  createExpense,
  removeExpense,
  removeAll,
};
