'use strict';

const { getNewId } = require('../utils/getNewId');
const { getFilteredExpenses } = require('../utils/getFilteredExpenses');

let expenses = [];

const getInitialValue = () => {
  expenses = [];
};

const getAllExpenses = (query) => {
  return getFilteredExpenses(expenses, query);
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === expenseId);

  return foundExpense || null;
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  const id = getNewId(expenses);

  const newExpense = {
    id,
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

const removeExpense = (expenseId) => {
  expenses = expenses.filter(
    expense => expense.id !== expenseId
  );
};

const updateExpense = (id, values) => {
  const expense = getExpenseById(id);

  Object.assign(expense, values);

  return expense;
};

module.exports = {
  expenseService: {
    getInitialValue,
    getAllExpenses,
    getExpenseById,
    createExpense,
    removeExpense,
    updateExpense,
  },
};
