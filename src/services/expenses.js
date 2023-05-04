'use strict';

const { idGenerator } = require('../tools/idGenerator');

let expenses = [];

const getNextId = idGenerator(expenses);

function reset() {
  expenses = [];
}

function getAll(options) {
  const {
    userId,
    categories,
    from,
    to,
  } = options;

  // eslint-disable-next-line no-console
  console.log(options, expenses);

  const filteredExpenses = expenses.filter(expense => {
    if (userId && expense.userId !== userId) {
      return false;
    }

    if (categories && expense.category !== categories) {
      return false;
    }

    if (from && to) {
      const spentAt = new Date(expense.spentAt).getTime();

      return (spentAt >= from) && (spentAt <= to);
    }

    return true;
  });

  return filteredExpenses;
}

function getById(id) {
  const foundExpense = expenses.find(expense => expense.id === id);

  return foundExpense || null;
}

function getByUserId(userId) {
  const filteredExpenses
    = expenses.filter(expense => expense.userId === userId);

  return filteredExpenses;
}

function create(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: getNextId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(id) {
  expenses = expenses.filter(expense => expense.id !== id);
}

function update({ id, ...expenseData }) {
  const expense = getById(id);

  Object.assign(expense, expenseData);
}

module.exports = {
  reset,
  getAll,
  getById,
  getByUserId,
  create,
  remove,
  update,
};
