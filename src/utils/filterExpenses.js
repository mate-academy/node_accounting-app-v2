'use strict';

const filterExpenses = (expenses, fields) => {
  const { userId, categories, from, to } = fields;

  return expenses.filter((expense) => {
    let matchedUserId = true;

    if (userId) {
      matchedUserId = expense.userId === Number(userId);
    }

    let matchedCategories = true;

    if (categories) {
      matchedCategories = categories.includes(expense.category);
    }

    const spentAtDate = Date.parse(expense.spentAt);
    const fromDate = from ? Date.parse(from) : null;
    const toDate = to ? Date.parse(to) : null;

    let matchedFromDate = true;

    if (fromDate) {
      matchedFromDate = spentAtDate >= fromDate;
    }

    let matchedToDate = true;

    if (toDate) {
      matchedToDate = spentAtDate <= toDate;
    }

    return (
      matchedUserId && matchedCategories && matchedFromDate && matchedToDate
    );
  });
};

module.exports = filterExpenses;
