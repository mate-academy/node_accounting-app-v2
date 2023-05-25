'use strict';

const filterExpenses = (expenses, { userId, categories, from, to }) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => expense.userId === userId);
  }

  if (categories.length) {
    filteredExpenses = filteredExpenses.filter(expense => categories.includes(expense.category));
  }

  if (from) {
    const fromDate = Date.parse(from);

    filteredExpenses = filteredExpenses.filter(expense => {
      const spentAtDate = Date.parse(expense.spentAt);

      return spentAtDate >= fromDate;
    });
  }

  if (to) {
    const toDate = Date.parse(to);

    filteredExpenses = filteredExpenses.filter(expense => {
      const spentAtDate = Date.parse(expense.spentAt);

      return spentAtDate <= toDate;
    });
  }

  return filteredExpenses;
}

module.exports = { filterExpenses };
