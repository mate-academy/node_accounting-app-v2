'use strict';

const getFilteredExpenses = (expenses, filters) => {
  let filteredExpenses = [...expenses];
  const { userId, categories, from, to } = filters;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === parseInt(userId));
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    const fromDate = new Date(from);

    filteredExpenses = filteredExpenses
      .filter(expense => new Date(expense.spentAt) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses
      .filter(expense => new Date(expense.spentAt) <= toDate);
  }

  return filteredExpenses;
};

module.exports = {
  getFilteredExpenses,
  // ... other services
};
