'use strict';

const { getNextId } = require('../helpers/getNextId');
const { filterExpenses } = require('../helpers/expenseHelper');

let expenses = [];

const init = () => {
  expenses = [];
};

const getExpenses = (filterOptions) => filterExpenses(expenses, filterOptions);

const getExpenseById = (id) => {
  const searchExpense = expenses.find(expense => expense.id === id);

  if (!searchExpense) {
    throw new Error('Expense doesn\'t exist');
  }

  return searchExpense;
};

const createExpense = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
    id: getNextId(expenses),
  };

  expenses.push(expense);

  return expense;
};

const deleteExpense = (id) => {
  const newExpenses = expenses.filter(expense => expense.id !== id);

  if (newExpenses.length === expenses.length) {
    throw new Error('Expense doesn\'t exist');
  }

  expenses = newExpenses;
};

const changeExpense = (updatedExpenseFields, id) => {
  const expenseToChangeIndex = expenses.findIndex(expense => expense.id === id);

  if (expenseToChangeIndex === -1) {
    throw new Error('Expense doesn\'t exist');
  }

  expenses[expenseToChangeIndex] = {
    ...expenses[expenseToChangeIndex],
    ...updatedExpenseFields,
  };

  return expenses[expenseToChangeIndex];
};

module.exports = {
  changeExpense,
  deleteExpense,
  getExpenses,
  getExpenseById,
  createExpense,
  init,
};
