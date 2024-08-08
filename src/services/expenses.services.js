'use strict';

const { generateId } = require('../helpers/helpers.js');

/**
 *@typedef {Object} Expense
 *@property {number} id
 *@property {number} userId
 *@property {string} spentAt
 *@property {string} title
 *@property {number} amount
 *@property {string} category
 *@property {string} [note]
 *@type {Expense[] | []}
 */
let expenses = [];

const findExpenseById = (id) => expenses.find(item => item.id === id);

const getAllExpenses = ({ userId, from, to, categories }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === +userId,
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter((expense) => {
      const spentAtDate = new Date(expense.spentAt);
      const expenseInRangeOfDates = spentAtDate >= fromDate
        && spentAtDate <= toDate;

      return expenseInRangeOfDates;
    });
  }

  if (categories) {
    const categoryList = categories.split(',');

    filteredExpenses = filteredExpenses.filter((expense) => {
      return categoryList.includes(expense.category);
    });
  }

  return filteredExpenses;
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: generateId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateExpenseById = (id, { spentAt, title, amount, category, note }) => {
  const searchedExpense = findExpenseById(id);

  if (searchedExpense) {
    if (spentAt) {
      searchedExpense.spentAt = spentAt;
    }

    if (title) {
      searchedExpense.title = title;
    }

    if (amount) {
      searchedExpense.amount = amount;
    }

    if (category) {
      searchedExpense.category = category;
    }

    if (note) {
      searchedExpense.note = note;
    }
  }

  return searchedExpense;
};

const getExpenseById = (id) => {
  return findExpenseById(id) || null;
};

const removeExpenseById = (id) => {
  const clearedExpenses = expenses.filter((expense) => expense.id !== id);

  const isRemoved = clearedExpenses.length !== expenses.length || null;

  expenses = clearedExpenses;

  return isRemoved;
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  removeExpenseById,
  updateExpenseById,
  findExpenseById,
  resetExpenses,
};
