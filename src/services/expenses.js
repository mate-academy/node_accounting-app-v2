'use strict';

const helpers = require('./helpers.js');

function getFilteredExpenses(expenses, {
  selectedUserId,
  categories,
  from,
  to,
}) {
  let newExpenses = [...expenses];

  if (!isNaN(selectedUserId)) {
    newExpenses = newExpenses.filter(({ userId }) => userId === selectedUserId);
  }

  if (categories && categories.length) {
    newExpenses = newExpenses.filter(({ category }) =>
      categories.includes(category)
    );
  }

  if (from) {
    newExpenses = newExpenses.filter(({ spentAt }) => spentAt >= from);
  }

  if (to) {
    newExpenses = newExpenses.filter(({ spentAt }) => spentAt < to);
  }

  return newExpenses;
}

function isDataValid({ users, userId, spentAt, title, amount, category }) {
  return isNaN(userId) || !helpers.getElementById(users, userId)
    || !spentAt || !title || isNaN(+amount) || !category;
}

// eslint-disable-next-line object-curly-newline
module.exports = { getFilteredExpenses, isDataValid };
