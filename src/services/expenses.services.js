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

const findExpenseById = (id) => {
  const searchedExpense = expenses.find((item) => item.id === id);

  if (!searchedExpense) {
    throw new Error('Not found');
  }

  return searchedExpense;
};

const getAllExpenses = ({ userId, from, to, categories }) => {
  let filteredExpenses = expenses;

  const conditions = [];

  if (userId) {
    conditions.push((expense) => expense.userId === +userId);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    conditions.push((expense) => {
      const spentAtDate = new Date(expense.spentAt);

      return spentAtDate >= fromDate && spentAtDate <= toDate;
    });
  }

  if (categories) {
    const categoryList = categories.split(',');

    conditions.push((expense) => categoryList.includes(expense.category));
  }

  filteredExpenses = filteredExpenses.filter((expense) => {
    return conditions.every((condition) => condition(expense));
  });

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
    const updates = {
      ...(spentAt && { spentAt }),
      ...(title && { title }),
      ...(amount && { amount }),
      ...(category && { category }),
      ...(note && { note }),
    };

    Object.assign(searchedExpense, updates);
  }

  return searchedExpense;
};

const getExpenseById = (id) => findExpenseById(id);

const removeExpenseById = (id) => {
  const clearedExpenses = expenses.filter((expense) => expense.id !== id);

  const isRemoved = clearedExpenses.length !== expenses.length;

  if (!isRemoved) {
    throw new Error('Not found');
  }

  expenses = clearedExpenses;
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
