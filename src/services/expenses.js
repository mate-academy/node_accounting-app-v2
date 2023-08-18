'use strict';

const generalServices = require('./general.js');

function filterExpenses(expenses, {
  selectedUserId,
  categories,
  from,
  to,
}) {
  let expensesCopy = [...expenses];

  if (!isNaN(selectedUserId)) {
    expensesCopy = expensesCopy
      .filter(({ userId }) => userId === selectedUserId);
  }

  if (categories && categories.length) {
    expensesCopy = expensesCopy
      .filter(({ category }) => categories.includes(category));
  }

  if (from) {
    expensesCopy = expensesCopy
      .filter(({ spentAt }) => spentAt >= from);
  }

  if (to) {
    expensesCopy = expensesCopy
      .filter(({ spentAt }) => spentAt < to);
  }

  return expensesCopy;
}

function isDataValid({ users, userId, spentAt, title, amount, category }) {
  return isNaN(userId) || !generalServices.getElementById(users, userId)
    || !spentAt || !title
    || isNaN(+amount) || !category;
}

module.exports = {
  filterExpenses,
  isDataValid,
};
