'use strict';

const filterExpenses = (allExpenses, filters) => {
  let filteredExpenses = [...allExpenses];

  if (filters.userId) {
    filteredExpenses = filteredExpenses
      .filter(item => item.userId === +filters.userId);
  }

  if (filters.categories) {
    filteredExpenses = filteredExpenses
      .filter(item => item.category === filters.categories);
  }

  if (filters.from && filters.to) {
    filteredExpenses = filteredExpenses
      .filter(item => item.spentAt > filters.from && item.spentAt < filters.to);
  }

  return filteredExpenses;
};

module.exports = filterExpenses;
