'use strict';

let expenses = [];
let id = 0;

const getAll = ({ userId, category, from, to }) => {
  if (!expenses.length) {
    return [];
  }

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (category) {
    expenses = expenses.filter(expense => expense.category === category);
  }

  if (from) {
    expenses = expenses.filter(expense => expense.spentAt >= from);
  }

  if (to) {
    expenses = expenses.filter(expense => expense.spentAt <= to);
  }

  return expenses;
};

const create = (params) => {
  const newExpense = {
    id: id++,
    ...params,
  };

  expenses.push(newExpense);

  return newExpense;
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

const remove = (userId) => {
  expenses = expenses.filter(user => user.id !== +userId);

  return expenses;
};

const update = (expenseId, params) => {
  const expense = getById(expenseId);

  Object.assign(expense, params);

  return expense;
};

const clear = () => {
  expenses = [];
};

module.exports = {
  getAll, create, getById, remove, update, clear,
};
