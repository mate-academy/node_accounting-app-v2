'use strict';

const generateId = require('../utils/generateId');

const expenses = [
  {
    'id': 1,
    'userId': 1,
    'spentAt': '2023-03-09T22:34:36.057Z',
    'title': 'gas',
    'amount': 2000,
    'category': 'car',
    'note': '',
  },
  {
    'id': 2,
    'userId': 3,
    'spentAt': '2023-03-22T18:34:36.057Z',
    'title': 'shopping',
    'amount': 23689,
    'category': 'clothes',
    'note': 'winter clothes',
  },
  {
    'id': 3,
    'userId': 2,
    'spentAt': '2023-03-18T16:34:36.057Z',
    'title': 'vegetables',
    'amount': 900,
    'category': 'products',
    'note': 'carrots, beets, cabbage',
  },
];

function getAll({
  userId,
  categories,
  from,
  to,
}) {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(el => el.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(el => categories.includes(el.category));
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(el => el.spentAt > from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(el => el.spentAt < to);
  }

  return filteredExpenses;
}

function getById(expenseId) {
  const foundExpens = expenses.find(user => user.id === +expenseId);

  return foundExpens || null;
}

function create(data) {
  const newExpense = {
    id: generateId.genId(expenses),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  const findExpensIndex = expenses
    .findIndex(expens => expens.id === +expenseId);

  expenses.splice(findExpensIndex, 1);
}

function update(expenseId, data) {
  const expenseToUpdate = getById(expenseId);

  Object.assign(expenseToUpdate, { ...data });

  return expenseToUpdate;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
