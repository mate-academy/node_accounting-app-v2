/* eslint-disable function-paren-newline */
'use strict';

const { generateId } = require('../helper/generateId');
const { getUserById } = require('./users.service');

let expenses = [];

const getExpenses = ({ userId, categories, from, to }) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category),
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.spentAt >= from,
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.spentAt <= to,
    );
  }

  return filteredExpenses;
};

const getExpenseById = (id) => {
  const expenseId = +id;

  return expenses.find((expense) => expense.id === expenseId);
};

const createExpense = (items) => {
  const newExpense = {
    id: generateId(expenses),
    ...items,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = (id) => {
  const expenseId = +id;

  expenses = expenses.filter((expense) => expense.id !== expenseId);
};

const updateExpense = (id, items) => {
  const expense = getExpenseById(id);

  if (!expense) {
    throw new Error(`Expense with ID ${id} not found.`);
  }

  Object.assign(expense, { ...items });

  return expense;
};

const validateCreation = (items) => {
  const { userId, spentAt, title, amount, category, note } = items;

  const arePropsValid =
    typeof userId === 'number' &&
    getUserById(userId) &&
    !isNaN(new Date(spentAt)) &&
    typeof title === 'string' &&
    title &&
    typeof amount === 'number' &&
    typeof category === 'string' &&
    category &&
    (typeof note === 'string' || typeof note === 'undefined');

  const validatedProps = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  return [arePropsValid, validatedProps];
};

const validateUpdate = (items) => {
  const { spentAt, title, amount, category, note } = items;

  const arePropsValid =
    (!isNaN(new Date(spentAt)) || typeof spentAt === 'undefined') &&
    ((typeof title === 'string' && title) || typeof title === 'undefined') &&
    (typeof amount === 'number' || typeof amount === 'undefined') &&
    ((typeof category === 'string' && category) ||
      typeof category === 'undefined') &&
    (typeof note === 'string' || typeof note === 'undefined');

  const validatedItems = {
    spentAt,
    title,
    amount,
    category,
    note,
  };

  Object.keys(validatedItems).forEach((key) => {
    if (validatedItems[key] === undefined) {
      delete validatedItems[key];
    }
  });

  return [arePropsValid, validatedItems];
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  validateCreation,
  validateUpdate,
  clearExpenses,
};
