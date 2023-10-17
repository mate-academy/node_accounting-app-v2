'use strict';

const { getUser } = require('./users.service');

let expenses = [];

const getAll = ({ query }) => {
  const { userId, from, to, categories } = query;

  if (userId) {
    const userById = getUser(userId);

    expenses = expenses
      .filter(expense => expense.userId === userById.id);
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    expenses = expenses
      .filter(expense => {
        const spentAtDate = new Date(expense.spentAt);

        return fromDate <= spentAtDate && toDate >= spentAtDate;
      });
  }

  return expenses;
};

const newExpense = (body) => {
  const expense = {
    id: +new Date().getTime(),
    ...body,
  };

  expenses.push(expense);

  return expense;
};

const getExpense = (id) => {
  return expenses.find(item => item.id === +id);
};

const removeExpense = (id) => {
  expenses = expenses.filter(item => item.id !== +id);
};
const clear = () => {
  expenses.length = 0;
};

module.exports = {
  getAll,
  newExpense,
  getExpense,
  removeExpense,
  clear,
};
