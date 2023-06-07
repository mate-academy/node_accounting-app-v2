'use strict';

function expensesFiltration(data, userId, category, from, to) {
  const filterByUserId = (expense) => {
    return !userId || expense.userId === Number(userId);
  };

  const filterByCategory = (expense) => {
    return !category || category.includes(expense.category);
  };

  const filterByTime = (expense) => {
    const expenseDate = new Date(expense.spentAt);
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    return (!fromDate || expenseDate >= fromDate)
      && (!toDate || expenseDate <= toDate);
  };

  return data
    .filter(filterByUserId)
    .filter(filterByCategory)
    .filter(filterByTime);
};

module.exports = expensesFiltration;
