'use strict';

const commonService = require('./common.service');

const expenseKeys = [
  'spentAt',
  'title',
  'amount',
  'category',
  'note',
];

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getNewExpense = (userId, categories, from, to) => {
  const newExpenses = expenses.filter(item => {
    if (userId && item.userId !== +userId) {
      return false;
    }

    if (categories && item.category !== categories) {
      return false;
    }

    if (from && to) {
      const spentAt = Date.parse(item.spentAt);

      return !(spentAt < Date.parse(from) || spentAt > Date.parse(to));
    }

    return true;
  });

  return newExpenses;
};

const createNewExpense = (expenseBody) => {
  const expense = {
    id: commonService.generateId(expenses),
    ...expenseBody,
  };

  expenses.push(expense);

  return expense;
};

const getExpenseById = (id) => {
  return commonService.findById(expenses, id);
};

const removeExpenseById = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const editExpense = (expense, request) => {
  Object.assign(expense, request);
};

module.exports = {
  expenseKeys,
  clearExpenses,
  getNewExpense,
  createNewExpense,
  getExpenseById,
  removeExpenseById,
  editExpense,
};
