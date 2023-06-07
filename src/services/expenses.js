'use strict';

let expenses = [];
const { getMax } = require('../utils/getMax');

const parseDate = (spentAt, from, to) => {
  return {
    expenseDate: new Date(spentAt),
    fromDate: new Date(from),
    toDate: new Date(to),
  };
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
      const {
        expenseDate,
        toDate,
        fromDate,
      } = parseDate(expense.spentAt, from, to);

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

  const id = getMax(expenses);
  const expense = {
    id,
    userId: Number(userId),
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const updateExpense = (expense, data) => {
  Object.assign(expense, data);
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(({ id }) => (
    id !== Number(expenseId)
  ));
};

const removeAll = () => {
  expenses = [];
};

module.exports = {
  filterExpenses,
  getById,
  createExpense,
  updateExpense,
  removeExpense,
  removeAll,
};
