'use strict';

const getNewId = (items) => {
  if (items.length === 0) {
    return 1;
  }

  const ids = items.map(i => i.id);

  return Math.max(...ids) + 1;
};

const filterExpenses = (
  expensesArr,
  userId,
  categories,
  from,
  to,
) => {
  let filteredExpenses = expensesArr;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(exp => exp.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(exp => categories.includes(exp.category));
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(exp => exp.spentAt >= from);
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(exp => exp.spentAt <= to);
  }

  return filteredExpenses;
};

module.exports = {
  getNewId,
  filterExpenses,
};
