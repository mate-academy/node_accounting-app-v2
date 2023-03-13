'use strict';

const getFilteredExpenses = (expenses, filterCriterions) => {
  const { userId, categories, from, to } = filterCriterions;

  let receivedExpenses = expenses;

  if (userId) {
    receivedExpenses = expenses.filter(expense =>
      expense.userId === +userId);
  }

  if (categories) {
    receivedExpenses = expenses.filter(expense =>
      expense.category === categories);
  }

  if (from) {
    receivedExpenses = expenses.filter(expense => expense.spentAt >= from);
  }

  if (to) {
    receivedExpenses = expenses.filter(expense => expense.spentAt <= to);
  }

  return receivedExpenses;
};

module.exports = {
  getFilteredExpenses,
};
