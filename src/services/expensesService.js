'use strict';

const { generatedId } = require('../utils/generatedId');

let expenses = [];

const getExpensesAll = ({ userId, categories, from, to }) => {
  let filterExpenses = [...expenses];

  if (userId) {
    filterExpenses = filterExpenses
      .filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    filterExpenses = filterExpenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (from) {
    filterExpenses = filterExpenses.filter(
      (expense) => new Date(expense.spentAt) > new Date(from)
    );
  }

  if (to) {
    filterExpenses = filterExpenses.filter(
      (expense) => new Date(expense.spentAt) < new Date(to)
    );
  }

  return filterExpenses;
};

const getExpensesById = (id) => {
  return expenses.find((item) => item.id === id);
};

const createExpenses = (
  userId, spentAt, title, amount, category, note
) => {
  const expense = {
    id: generatedId(expenses),
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

const updateExpense = ({ id, spentAt, title, amount, category, note }) => {
  const expense = getExpensesById(+id);

  Object.assign(expense, {
    spentAt, title, amount, category, note,
  });

  return expense;
};

const removeExpenses = (id) => {
  expenses = expenses.filter(item => item.id !== id);
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpensesAll,
  getExpensesById,
  createExpenses,
  updateExpense,
  removeExpenses,
  resetExpenses,
};
