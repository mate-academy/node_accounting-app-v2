'use strict';

const utils = require('../utils/utils.js');

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (expenseId) => {
  const foundUser = expenses.find(expense => expense.id === +expenseId);

  return foundUser || null;
};

const getByParams = (params) => {
  const { userId, category, from, to } = params;

  const filteredExpenses = expenses.filter(expense => {
    let isMatch = true;

    if (userId) {
      isMatch = expense.userId === +userId;
    }

    if (category) {
      isMatch = typeof category === 'string'
        ? category === expense.category
        : category.includes(expense.category);
    }

    if (from) {
      const dateFrom = new Date(from);
      const currentDate = new Date(expense.spentAt);

      isMatch = currentDate >= dateFrom;
    }

    if (to) {
      const dateTo = new Date(to);
      const currentDate = new Date(expense.spentAt);

      isMatch = currentDate <= dateTo;
    }

    return isMatch;
  });

  return filteredExpenses;
};

const create = (expenseData) => {
  const { userId, spentAt, title, amount, category, note } = expenseData;

  const newExpense = {
    id: utils.getRandomId(),
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

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const edit = (expenseId, newData) => {
  expenses = expenses.map(expense => {
    if (expense.id !== +expenseId) {
      return expense;
    }

    return Object.assign(expense, newData);
  });

  const editedExpense = getById(expenseId);

  return editedExpense;
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  edit,
  getByParams,
};
