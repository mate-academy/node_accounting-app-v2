'use strict';

const { getId } = require('../utils/createdNewId');
const { getFilteredExpenses } = require('../utils/getFilteredExpenses');

let expenses = [];

const init = () => {
  expenses = [];
};

const getAll = (query) => {
  return getFilteredExpenses(expenses, query);
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const newExpense = {
    id: getId(expenses),
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
  expenses = expenses.filter(expense => expense.id
    !== +expenseId);
};

const update = ({ expenseId, params }) => {
  const expense = getById(expenseId);

  Object.assign(expense, params);

  return expense;
};

module.exports = {
  init,
  getAll,
  getById,
  create,
  remove,
  update,
};
